import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-annotator',
  templateUrl: './add-annotator.component.html',
  styleUrls: ['./add-annotator.component.scss']
})
export class AddAnnotatorComponent implements OnInit {

  constructor(private fb: FormBuilder) {
    this.validateForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      firstName: [''],
      lastName: [''],
      companyRole: [''],
      status: ['A']
    });
  }
  showModal = false;
  @Output() isModalVisibleChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() set isModalVisible(value) {
    this.showModal = value;
    this.isModalVisibleChange.emit(value);
  }
  @Output() submitedValue: EventEmitter<any> = new EventEmitter();
  validateForm: FormGroup;
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
  }

  closeModal() {
    this.isModalVisible = false;
    this.submitedValue.emit(null);
  }

  ngOnInit() {
  }

}
