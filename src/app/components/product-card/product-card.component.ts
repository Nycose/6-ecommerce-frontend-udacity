import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IProduct } from 'src/app/models/product-model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input()
  product: IProduct;

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  addedToCart(): void {
    this._snackBar.open(`${this.product.title} added to cart.`, 'DISMISS', {duration: 2500});
  }

  removedFromCart(): void {
    this._snackBar.open(`${this.product.title} removed from cart.`, 'DISMISS', {duration: 2500});
  }

}
