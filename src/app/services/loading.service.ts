import { Injectable } from '@angular/core';
import { BehaviorSubject, concatMap, finalize, Observable, of, tap } from 'rxjs';

@Injectable()
export class LoadingService {

  private subject = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean> = this.subject.asObservable();

  constructor() {  }

  showLoadingUntilComplete<T>(obs$: Observable<T>): Observable<T> {
    return of(null).pipe(
      tap(() => this.loadingOn()),
      concatMap(() => obs$),
      finalize(() => this.loadingOff())
    )
  }

  loadingOn(): void {
    this.subject.next(true);
  }

  loadingOff(): void {
    this.subject.next(false);
  }
  
}
