import { Injectable } from '@angular/core';
import { BehaviorSubject, concatMap, finalize, Observable, of, tap } from 'rxjs';

@Injectable()
export class LoadingService {

  private _subject = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean> = this._subject.asObservable();

  constructor() { }

  showLoadingUntilComplete<T>(obs$: Observable<T>): Observable<T> {
    return of(null).pipe(
      tap(() => this.loadingOn()),
      concatMap(() => obs$),
      finalize(() => this.loadingOff())
    )
  }

  loadingOn(): void {
    this._subject.next(true);
  }

  loadingOff(): void {
    this._subject.next(false);
  }
  
}
