import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-home',
  templateUrl: './login-home.component.html',
  styleUrls: ['./login-home.component.css']
})
export class LoginHomeComponent implements OnInit {

  form = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  constructor(private _fb: FormBuilder, private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
    this._auth.redirectLoggedInUser();
  }

  login() {
    this._auth.login(this.email.value, this.password.value)
      .subscribe(() => this._router.navigateByUrl('/shop'))
  }

  get email() {
    return this.form.controls['email'];
  }

  get password() {
    return this.form.controls['password'];
  }

}
