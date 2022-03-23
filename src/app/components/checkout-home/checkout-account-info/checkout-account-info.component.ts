import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, Subscription, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { usernameValidator } from './usernameValidator';

@Component({
  selector: 'app-checkout-account-info',
  templateUrl: './checkout-account-info.component.html',
  styleUrls: ['./checkout-account-info.component.css']
})
export class CheckoutAccountInfoComponent implements OnInit, OnDestroy {

  form = this.fb.group({
    firstName: ['', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(60)
    ]],
    lastName: ['', [
      Validators.required, 
      Validators.minLength(2),
      Validators.maxLength(60)
    ]],
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    username: ['', {
      validators: Validators.required,
      asyncValidators: usernameValidator(this.auth),
      updateOn: 'blur'
    }],
    password: ['', Validators.required]
  });

  private _isLoggedIn: Subscription;

  @Output('userFormDisabled')
  private _userFormDisabled = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit(): void {
    this._isLoggedIn = this.auth.isLoggedIn()
      .pipe(
        filter(status => status),
        tap((status) => {
          this.form.disable();
          this._userFormDisabled.emit(true);
        })
      )
      .subscribe()
  }

  ngOnDestroy(): void {
    this._isLoggedIn.unsubscribe();
  }

  get firstName() {
    return this.form.controls['firstName'];
  }

  get lastName() {
    return this.form.controls['lastName'];
  }

  get email() {
    return this.form.controls['email'];
  }

  get username() {
    return this.form.controls['username'];
  }

  get password() {
    return this.form.controls['password'];
  }

}
