import { NgModule } from '@angular/core';
import { CreateEditComponent } from './create-edit/create-edit.component';
import { ListComponent } from './list/list-component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { TasksService } from './tasks.service';
import { HttpClientModule } from '@angular/common/http';

const components = [CreateEditComponent, ListComponent];

@NgModule({
  declarations: [...components],
  imports: [SharedModule, MaterialModule, HttpClientModule],
  exports: [...components],
  providers: [TasksService]
})
export class TasksModule {
}
