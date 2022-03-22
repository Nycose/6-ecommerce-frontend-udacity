import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { states } from './states';
import * as moment from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-checkout-payment-details',
  templateUrl: './checkout-payment-details.component.html',
  styleUrls: ['./checkout-payment-details.component.css']
})
export class CheckoutPaymentDetailsComponent implements OnInit, OnDestroy {

  date = moment();

  form = this.fb.group({
    shippingAddress: [null, Validators.required],
    city: [null, Validators.required],
    state: [null, Validators.required],
    zip: [null, [Validators.required, Validators.min(10000), Validators.max(99999)]],
    billingSameAsShipping: [true],
    billingAddress: [{value: null, disabled: true}, Validators.required],
    billingCity: [{value: null, disabled: true}, Validators.required],
    billingState: [{value: null, disabled: true}, Validators.required],
    billingZip: [{value: null, disabled: true}, [Validators.required, Validators.min(10000), Validators.max(99999)]],
    cardType: ['credit', Validators.required],
    nameOnCard: [null, Validators.required],
    cardNumber: [null, [Validators.required, Validators.pattern('[0-9]*')]],
    expiration: [this.date, Validators.required],
    cvv: [null, [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(3), Validators.maxLength(3)]]
  });

  states = states;
  showBilling: boolean;

  private valueChangesSubscription: Subscription;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this._initBillingControls();
  }

  ngOnDestroy(): void {
    this.valueChangesSubscription.unsubscribe();
  }

  private _initBillingControls() {
    const billingFields = [this.billingAddress, this.billingCity, this.billingState, this.billingZip];

    this.valueChangesSubscription = this.billingSameAsShipping.valueChanges.subscribe(val => {

      if (val && this.billingAddress.enabled) {
        this.showBilling = false;
        billingFields.forEach(field => field.disable({emitEvent: false}))
      } else if (val === false && this.billingAddress.disabled) {
        this.showBilling = true;
        billingFields.forEach(field => field.enable({emitEvent: false}))
      }

    });
  }

  chosenYearHandler(normalizedYear: moment.Moment) {
    const ctrlValue = this.expiration.value;
    ctrlValue.year(normalizedYear.year());
    this.expiration.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: moment.Moment, datepicker: MatDatepicker<moment.Moment>) {
    const ctrlValue = this.expiration.value;
    ctrlValue.month(normalizedMonth.month());
    this.expiration.setValue(ctrlValue);
    datepicker.close();
  }

  get shippingAddress() {
    return this.form.get('shippingAddress') as FormControl;
  }

  get city() {
    return this.form.get('city') as FormControl;
  }

  get state() {
    return this.form.get('state') as FormControl;
  }

  get zip() {
    return this.form.get('zip') as FormControl;
  }

  get billingSameAsShipping() {
    return this.form.get('billingSameAsShipping') as FormControl;
  }

  get billingAddress() {
    return this.form.get('billingAddress') as FormControl;
  }

  get billingCity() {
    return this.form.get('billingCity') as FormControl;
  }

  get billingState() {
    return this.form.get('billingState') as FormControl;
  }

  get billingZip() {
    return this.form.get('billingZip') as FormControl;
  }

  get cardType() {
    return this.form.get('cardType') as FormControl;
  }

  get nameOnCard() {
    return this.form.get('nameOnCard') as FormControl;
  }

  get cardNumber() {
    return this.form.get('cardNumber') as FormControl;
  }

  get expiration() {
    return this.form.get('expiration') as FormControl;
  }

  get cvv() {
    return this.form.get('cvv') as FormControl;
  }

}
