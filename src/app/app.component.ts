import { AfterContentChecked, AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  cartQuantity$: Observable<number>;
  badgeHidden$: Observable<boolean>;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartQuantity$ = this.cartService.getCartQuantity();
    this.badgeHidden$ = this.cartService.getCartQuantity().pipe(
      map(num => num < 1)
    )
  }

}
