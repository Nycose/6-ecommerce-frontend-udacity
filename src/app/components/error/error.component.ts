import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  showMessages = false;

  errors$: Observable<string[]>;

  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
    this.errors$ = this.messageService.errors$.pipe(
      tap(() => this.showMessages = true)
    )
  }

  onClose() {
    this.showMessages = false;
  }

}
