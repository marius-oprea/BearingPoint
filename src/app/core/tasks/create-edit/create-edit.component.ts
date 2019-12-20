import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss']
})
export class CreateEditComponent {
  isNew: boolean;
  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.isNew = true;
    this.formGroup = this.fb.group({
      name: this.fb.control(''),
      description: this.fb.control('')
    });
  }

  onSubmit(value) {

  }
}
