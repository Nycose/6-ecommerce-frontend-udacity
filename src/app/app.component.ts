import { AfterContentChecked, AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  cartQuantity$: Observable<number>;
  badgeHidden$: Observable<boolean>;

  constructor(private _cartService: CartService, public auth: AuthService) {}

  ngOnInit(): void {
    this.cartQuantity$ = this._cartService.getCartQuantity();
    this.badgeHidden$ = this._cartService.getCartQuantity().pipe(
      map(num => num < 1)
    )
  }

}
