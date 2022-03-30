import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let el: DebugElement;

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      declarations: [ ProductListComponent ]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create component', () => {
    
    expect(component).toBeDefined();

  });

  it('should display the product list', () => {

    component.products = [{
      id: 1,
      title: 'Salad w/ Protein',
      price: 10.75,
      category: 'Salad',
      description: 'Lorem ipsum',
      image: 'test',
      quantity: 0,
      total: 0
    }];

    fixture.detectChanges();
    
    expect(component.products.length)
      .withContext('Unexpected number of products in component class')
      .toBe(1);

    const products = el.queryAll(By.css(".grid-item"));

    expect(products.length)
      .withContext('Unexpected number of "grid-item" columns')
      .toBe(1);

  })

});
