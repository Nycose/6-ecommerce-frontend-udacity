import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { usernameValidator } from './usernameValidator';

@Component({
  selector: 'app-checkout-account-info',
  templateUrl: './checkout-account-info.component.html',
  styleUrls: ['./checkout-account-info.component.css']
})
export class CheckoutAccountInfoComponent implements OnInit {

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
      asyncValidators: [usernameValidator(this.auth)]
    }]
  });

  constructor(private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit(): void {
    
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

}
