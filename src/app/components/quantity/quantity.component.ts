import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable, tap } from 'rxjs';
import { IProduct } from 'src/app/models/product-model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.css']
})
export class QuantityComponent implements OnInit, OnDestroy, OnChanges {

  @Input()
  product: IProduct;

  @Input()
  quantity: number | null;

  control = new FormControl(1);

  isInCart$: Observable<boolean>;

  constructor(private cartService: CartService, private _snackBar: MatSnackBar) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.control.setValue(this.quantity)
  }
  
  ngOnInit(): void {
    this.isInCart$ = this.cartService.isInCart(this.product.id);
  }

  ngOnDestroy(): void {
    
  }

  addToCart() {
    this._snackBar
    .open(`${this.product.title} added to cart.`, 'DISMISS', { duration: 2500 });

    const quant = this.control.value;

    this.cartService.addToCart(this.product, quant);
  }

}
