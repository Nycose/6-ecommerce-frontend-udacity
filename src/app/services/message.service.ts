import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable } from 'rxjs';

@Injectable()
export class MessageService {

  private _subject = new BehaviorSubject<string[]>([]);
  errors$: Observable<string[]> = this._subject.asObservable()
    .pipe(
      filter(messages => messages && messages.length > 0)
    );

  constructor() { }

  showErrors(error: any, ...message: string[]) {
    console.log(error, message);
    this._subject.next(message);
  }
}
