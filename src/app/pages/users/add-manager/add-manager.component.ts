import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-manager',
  templateUrl: './add-manager.component.html',
  styleUrls: ['./add-manager.component.scss']
})
export class AddManagerComponent implements OnInit {

  constructor(private fb: FormBuilder) {
    this.validateForm = this.fb.group(
      {
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: [null, [Validators.required]],
        confirmPassword: [null],
        firstName: [''],
        lastName: [''],
        companyRole: [''],
        price: [0, [Validators.required]],
        status: ['A', [Validators.required]],
      },
      {validator: this.checkPasswords}
    );
  }
  showModal = false;
  @Output() isModalVisibleChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() set isModalVisible(value) {
    this.showModal = value;
    this.isModalVisibleChange.emit(value);
  }
  @Output() submitedValue: EventEmitter<any> = new EventEmitter();
  validateForm: FormGroup;

  checkPasswords(group: FormGroup) {
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value;
  
    return pass === confirmPass ? null : { notSame: true }     
  }

  submitForm = ($event: any, value: any) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    // console.log(value);
    this.submitedValue.emit(value);
    this.isModalVisible = false;
    this.resetForm(null);
  };

  resetForm(e: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
      
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    this.validateForm.controls['price'].setValue(0);
    this.validateForm.controls['status'].setValue('A');
    this.validateForm.controls['firstName'].setValue('');
    this.validateForm.controls['lastName'].setValue('');
  }

  closeModal() {
    this.isModalVisible = false;
    this.submitedValue.emit(null);
  }

  formatterDollar = (value: number) => `$ ${value}`;
  parserDollar = (value: string) => value.replace('$ ', '');

  ngOnInit() {
  }

}
