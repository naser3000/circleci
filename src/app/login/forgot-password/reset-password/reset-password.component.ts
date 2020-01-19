import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private _route: ActivatedRoute) { }

  resetPasswordForm: FormGroup;
  resetPasswordToken = null;
  
  resetPassword(e, formData): void {
    for (const i in this.resetPasswordForm.controls) {
      this.resetPasswordForm.controls[i].markAsDirty();
      this.resetPasswordForm.controls[i].updateValueAndValidity();
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
  }

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.resetPasswordForm.controls['newPassword'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  ngOnInit() {
    this.resetPasswordForm = this.fb.group({
      newPassword: [null, [Validators.required]],
      confirmPassword: [null, [this.confirmValidator]],
    });
    this._route.params.subscribe(param => {
      this.resetPasswordToken = param['key'];
    });
  }

}
