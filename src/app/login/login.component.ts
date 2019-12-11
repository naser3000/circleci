import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private _shared: SharedService,
    private _auth: AuthService,
    private _token: TokenService,
    private _router: Router) {}


  validateForm: FormGroup;
  forgotForm: FormGroup;
  formStatus = 'login';

  submitForm(e, formData): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    const data = {
      username: formData['userName'],
      password: formData['password']
    };
    this._auth.loginUser(data).subscribe(
      response => {
        this._token.setToken(response['key']);
        // this._shared.changeUser(response['user']);
        this._router.navigate(['']);
      },
      error => {}
    );
  }
  
  resetPassword(e, formData): void {
    for (const i in this.forgotForm.controls) {
      this.forgotForm.controls[i].markAsDirty();
      this.forgotForm.controls[i].updateValueAndValidity();
    }
    const data = {
      email: formData['email'],
    };
    // this._auth.loginUser(data).subscribe(
    //   response => {
    //     console.log(response);
    //   },
    //   error => {}
    // );
    this.formStatus = 'msg';
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
    this.forgotForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }
}
