import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, filter, map, Observable, tap, throwError, timer } from 'rxjs';
import { IUser } from '../models/user-model';
import { LoadingService } from './loading.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _userSubject = new BehaviorSubject<IUser | null>(this._initUser());
  user$: Observable<IUser | null> = this._userSubject.asObservable();

  constructor(private _http: HttpClient, private _router: Router, private _loadingService: LoadingService, private _messageService: MessageService) {}

  private _initUser(): IUser | null {
    const user = localStorage.getItem('AUTH');
    return user ? JSON.parse(user) : null;
  }

  private _saveUserToLocalStorage(user: IUser): void {
    this._userSubject.next(user);
    localStorage.setItem('AUTH', JSON.stringify(user));
  }

  fetchAllUsers(): Observable<IUser[]> {
    return this._http.get<IUser[]>('/api/users')
      .pipe(
        catchError((err) => {
          const message = err.error;
          this._messageService.showErrors(err, message);
          return throwError(() => new Error(err));
        })
      );
  }

  register(user: IUser): Observable<IUser> {
    return this._http.post<IUser>('/api/register', user)
      .pipe(
        catchError((err) => {
          const message = err.error;
          this._messageService.showErrors(err, message);
          return throwError(() => new Error(err));
        }),
        tap(user => this._saveUserToLocalStorage(user))
      )
  }

  login(email: string, password: string): Observable<IUser> {
    const login$ = this._http.post<IUser>('/api/login', {email, password})
      .pipe(
        catchError((err) => {
          const message = err.error;
          this._messageService.showErrors(err, message);
          return throwError(() => new Error(err));
        }),
        tap(user => this._saveUserToLocalStorage(user))
      )
    
    return this._loadingService.showLoadingUntilComplete(login$);
  }

  logout(): void {
    localStorage.removeItem('AUTH');
    this._userSubject.next(null);
    this._router.navigateByUrl('/login');
  }

  isLoggedIn(): Observable<boolean> {
    return this.user$
      .pipe(
        map(user => !!user)
      );
  }

  redirectLoggedInUser() {
    const isLoggedIn = this.loginStatus;
    if (isLoggedIn) {
      this._router.navigateByUrl('');
    }
  }

  redirectLoggedOutUser() {
    const isLoggedOut = !this.loginStatus;
    if (isLoggedOut) {
      this._router.navigateByUrl('');
    }
  }

  get currentUser(): IUser | null {
    const currentUser = this._userSubject.value;
    return currentUser;
  }

  get loginStatus(): boolean {
    const isLoggedIn = this._userSubject.value;
    return !!isLoggedIn;
  }
  
  get userId(): number | null {
    const user = this._userSubject.value;
    return user?.userId || null;
  }

}
