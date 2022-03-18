import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/product-model';

type IProductList = null | IProduct[];

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input('productList')
  products: IProductList;

  constructor() { }

  ngOnInit(): void {
  }

}
