import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, filter, Observable, tap, timer } from 'rxjs';
import { IUser } from '../models/user-model';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject = new BehaviorSubject<IUser | null>(this._initUser());
  user$: Observable<IUser | null> = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router, private loadingService: LoadingService) {}

  private _initUser(): IUser | null {
    const user = localStorage.getItem('AUTH');

    if (user) {
      return JSON.parse(user);
    } else {
      return null;
    }
  }

  fetchAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>('/api/users');
  }

  register(user: IUser): void {
    this.http.post<IUser>('/api/register', user)
      .pipe(
        filter(user => !!user.email),
        tap(user => {
          this.userSubject.next(user);
          this.router.navigateByUrl('/shop');
          localStorage.setItem('AUTH', JSON.stringify(user));
        })
      )
      .subscribe();
  }

  login(email: string, password: string): void {
    const login$ = this.http.post<IUser>('/api/login', {email, password})
      .pipe(
        filter(user => !!user.email),
        tap(user => {
          this.userSubject.next(user);
          this.router.navigateByUrl('/shop');
          localStorage.setItem('AUTH', JSON.stringify(user));
        })
      )
    
      this.loadingService.showLoadingUntilComplete(login$).subscribe();
  }

  logout(): void {
    this.router.navigateByUrl('/shop')
    localStorage.removeItem('AUTH');
    this.userSubject.next(null);
  }

}
