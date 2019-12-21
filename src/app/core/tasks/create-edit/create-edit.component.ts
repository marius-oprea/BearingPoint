import { Component, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { TasksService } from '../tasks.service';
import { Observable, Subscription } from 'rxjs';
import { Task } from '../task.model';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss']
})
export class CreateEditComponent implements OnDestroy {
  formGroup: FormGroup;
  @ViewChild('form', null) private form: NgForm;
  isEditMode$: Observable<boolean>;
  editableTask$: Observable<Task>;
  subscription: Subscription;

  constructor(private fb: FormBuilder, private tasksService: TasksService) {

    this.isEditMode$ = this.tasksService.isEditMode$;
    this.editableTask$ = this.tasksService.editableTask$;

    this.formGroup = this.fb.group({
      id: this.fb.control(''),
      name: this.fb.control('', Validators.required),
      description: this.fb.control(''),
      isCompleted: this.fb.control(false)
    });

    this.subscription = this.editableTask$.subscribe(result => {
      if (this.tasksService.isEditMode) {
        this.formGroup.setValue(this.tasksService.editableTask);
      }
    });
  }

  onSubmit(value) {
    this.formGroup.updateValueAndValidity();
    if (this.formGroup.valid) {
      if (!this.tasksService.isEditMode) {
        this.tasksService.dispatch('CREATE', this.formGroup.value);
      } else {
        this.tasksService.dispatch('EDIT', this.formGroup.value);
        this.tasksService.isEditMode = false;
      }
      this.form.resetForm();
      this.formGroup.reset();
      this.formGroup.markAsUntouched();
    } else {
      // add fancy info popup here
      alert('Invalid form. Please fill all required fields.');
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
