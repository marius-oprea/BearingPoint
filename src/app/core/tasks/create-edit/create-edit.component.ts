import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss']
})
export class CreateEditComponent {
  isNew: boolean;
  formGroup: FormGroup;
  @ViewChild('form', null) private form: NgForm;

  constructor(private fb: FormBuilder, private tasksService: TasksService) {
    this.isNew = true;
    this.formGroup = this.fb.group({
      name: this.fb.control('', Validators.required),
      description: this.fb.control('')
    });
  }

  onSubmit(value) {
    this.formGroup.updateValueAndValidity();
    if (this.formGroup.valid) {
      this.tasksService.dispatch('CREATE', this.formGroup.value);
      this.form.resetForm();
      this.formGroup.reset();
      this.formGroup.markAsUntouched();
    } else {
      alert('Invalid form. Please fill all required fields.');
    }
  }
}
