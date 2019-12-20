import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

const modules = [MatInputModule, MatButtonModule, MatCardModule, MatTableModule, MatIconModule, MatCheckboxModule];

@NgModule({
  imports: [...modules],
  exports: [...modules]
})
export class MaterialModule {
}
