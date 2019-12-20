import { NgModule } from '@angular/core';
import { CreateEditComponent } from './create-edit/create-edit.component';
import { ListComponent } from './list/list-component';

const components = [CreateEditComponent, ListComponent];

@NgModule({
  declarations: [...components],
  imports: [],
  exports: [...components]
})
export class TasksModule {
}
