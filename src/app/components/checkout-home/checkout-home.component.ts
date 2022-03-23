import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatStep, MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { IOrder } from 'src/app/models/order-model';
import { IProduct } from 'src/app/models/product-model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { LoadingService } from 'src/app/services/loading.service';
import { CheckoutAccountInfoComponent } from './checkout-account-info/checkout-account-info.component';

@Component({
  selector: 'app-checkout-home',
  templateUrl: './checkout-home.component.html',
  styleUrls: ['./checkout-home.component.css']
})
export class CheckoutHomeComponent implements OnInit, AfterViewInit {

  cart$: Observable<IProduct[]>;

  total$: Observable<number>;

  userFormEditable: boolean = true;

  @ViewChild(CheckoutAccountInfoComponent)
  private _userForm: CheckoutAccountInfoComponent;

  @ViewChild('stepper')
  private _stepper: MatStepper

  constructor(private _cart: CartService, private _cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cart$ = this._cart.cartItems$;
    this.total$ = this._cart.getCartTotalCost();
  }

  ngAfterViewInit(): void {
    if(!this.userFormEditable) {
      this._stepper.next();
      this._cd.detectChanges();
    }
  }

  onUserFormDisabled() {
      this.userFormEditable = false
  }

  onSubmit() {
    const user = this._userForm.form.value;
    this._cart.checkout(user)
  }


}
