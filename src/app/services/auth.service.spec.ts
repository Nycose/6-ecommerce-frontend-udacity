import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { concatMap, Observable, of } from 'rxjs';
import { USER_DB } from 'src/server/user';
import { IUser } from '../models/user-model';

import { AuthService } from './auth.service';
import { LoadingService } from './loading.service';
import { MessageService } from './message.service';

describe('AuthService', () => {

  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  let message: MessageService;
  let router: Router;

  beforeEach(() => {

    const loadingService = {
      showLoadingUntilComplete<T>(obs$: Observable<T>): Observable<T> {
        return of(null).pipe(
          concatMap(() => obs$)
        )
      }
    }

    router = jasmine.createSpyObj(Router, ['navigateByUrl']);

    message = jasmine.createSpyObj(MessageService, ['showErrors']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: Router, useValue: router},
        {provide: LoadingService, useValue: loadingService},
        {provide: MessageService, useValue: message}
      ]
    });

    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);

    localStorage.removeItem('AUTH');

  });

  it('should be created', () => {

    expect(authService).toBeDefined();

    expect(authService.fetchAllUsers).toBeDefined();

  });

  it('should load all users', () => {

    authService.fetchAllUsers()
      .subscribe(users => {

        expect(users.length).withContext('No users returned').toBeGreaterThanOrEqual(1);

      });

    const req = httpTestingController.expectOne('/api/users', 'Unexpected number of requests made to fetch users');

    expect(req.request.method)
      .withContext('Unexpected http request type when fetching users')
      .toBe('GET');

    req.flush(USER_DB);

  });

  it('should register a user', () => {

    const user = {
      firstName: 'Test',
      lastName: 'User',
      username: 'testuser',
      email: 'test@test.com',
      password: 'Welcome'    
    }

    authService.register(user)
      .subscribe(user => {

        expect(user.id).toBe(2);

        expect(user.email).toBe('test@test.com');

      });

    const req = httpTestingController.expectOne('/api/register', 'Unexpected number of requests made to register user');

    expect(req.request.method)
      .withContext('Unexpected http request type when registering user')
      .toBe('POST');

    const userRes: IUser = {
      ...user,
      id: 2,
      userId: 2
    };

    expect(req.request.body).toEqual(user)

    req.flush(userRes);

  })

  it('should login a user', () => {

    const email = 'test@test.com';
    const password = 'test';

    authService.login(email, password)
      .subscribe(user => {

        expect(user.userId).toBe(1);

        expect(user.email).toBe(email);

        expect(user.isAdmin).toBe(false);

      });

    const req = httpTestingController.expectOne('/api/login');

    expect(req.request.method).toBe('POST');

    const user = {
      userId: 1,
      firstName: 'Test',
      lastName: 'Test',
      email: 'test@test.com',
      isAdmin: false
    }

    req.flush(user);

  })

  it('should logout a user', () => {

    localStorage.setItem('AUTH', 'test');
    
    authService.logout();

    authService.user$.subscribe(val => {

      expect(val).toBe(null);

    })

    const userInLocalStorage = localStorage.getItem('AUTH');

    expect(userInLocalStorage).toBe(null);
    
    expect(router.navigateByUrl).toHaveBeenCalledTimes(1);

  })

  it('should verify user is logged out', () => {

    authService.isLoggedIn()
      .subscribe(loginStatus => {

        expect(loginStatus).toBeFalse();

      })

  })

  it('should verify user is logged in', () => {

    (authService as any)._userSubject.next(true);

    authService.isLoggedIn()
      .subscribe(loginStatus => {

        expect(loginStatus).toBeTrue();

      })

  })

  it('should redirect logged in users', () => {

    (authService as any)._userSubject.next(true);

    authService.redirectLoggedInUser();

    expect(router.navigateByUrl).toHaveBeenCalledTimes(1);

  })

  it('should not redirect logged in users', () => {

    (authService as any)._userSubject.next(false);

    authService.redirectLoggedInUser();

    expect(router.navigateByUrl).not.toHaveBeenCalled();

  })

  it('should redirect logged out users', () => {

    (authService as any)._userSubject.next(false);

    authService.redirectLoggedOutUser();

    expect(router.navigateByUrl).toHaveBeenCalledTimes(1);

  })

  it('should not redirect logged out users', () => {

    (authService as any)._userSubject.next(true);

    authService.redirectLoggedOutUser();

    expect(router.navigateByUrl).not.toHaveBeenCalled();

  })

  afterEach(() => {

    httpTestingController.verify();
    localStorage.removeItem('AUTH');

  })

});
