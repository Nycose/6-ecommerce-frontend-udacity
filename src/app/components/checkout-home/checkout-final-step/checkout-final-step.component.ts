import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/product-model';

@Component({
  selector: 'app-checkout-final-step',
  templateUrl: './checkout-final-step.component.html',
  styleUrls: ['./checkout-final-step.component.css']
})
export class CheckoutFinalStepComponent implements OnInit {

  @Input()
  cardNumber: string;

  @Input()
  cart: IProduct[];

  @Input()
  total: number;

  constructor() { }

  ngOnInit(): void {
    
  }

}
