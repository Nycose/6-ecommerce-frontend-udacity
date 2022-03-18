import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/models/product-model';
import { QuantityService } from 'src/app/services/quantity.service';

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.css'],
  providers: [QuantityService]
})
export class QuantityComponent implements OnInit {

  @Input()
  product: IProduct;

  @Output()
  quantityIncreased = new EventEmitter<true>();

  @Output()
  removedFromCart = new EventEmitter<true>();

  hidden$: Observable<boolean>;
  quantity$: Observable<number>;

  constructor(private quantityService: QuantityService) { }

  ngOnInit(): void {
    this.hidden$ = this.quantityService.isInCart(this.product.id);
    this.quantity$ = this.quantityService.getQuantityById(this.product.id);
  }

  addToCart(): void {
    this.quantityService.addToCart(this.product, 1);
    this.quantityIncreased.emit(true);
  }

  increaseQuantity(quantity: string): void {
    const quant = Number(quantity);
    this.quantityService.addToCart(this.product, quant);
    this.quantityIncreased.emit(true);
  }

  removeFromCart(): void {
    this.quantityService.removeFromCart(this.product);
    this.removedFromCart.emit(true);
  }

}
