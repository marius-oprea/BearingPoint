import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const modules = [CommonModule, ReactiveFormsModule];

@NgModule({
  imports: [...modules],
  exports: [...modules]
})
export class SharedModule {
}
