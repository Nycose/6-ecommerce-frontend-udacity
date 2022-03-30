import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';

import { ProductCardComponent } from './product-card.component';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    const snackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      providers: [
        {provide: MatSnackBar, useValue: snackBar}
      ],
      declarations: [ ProductCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.product = {
      id: 1,
      title: 'Salad w/ Protein',
      price: 10.75,
      category: 'Salad',
      description: 'Lorem ipsum',
      image: 'test',
      quantity: 0,
      total: 0
    };
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeDefined();
    expect(component).toBeTruthy();
  });

  it('should display product title', () => {

    const title = el.query(By.css('mat-card-title'));

    expect(title.nativeElement.textContent).toBe('Salad w/ Protein');

  });

  it('should display price as currency', () => {

    const price = el.query(By.css('mat-card-subtitle'));

    expect(price.nativeElement.textContent).toBe('$10.75')

  });

});
