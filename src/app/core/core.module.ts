import { NgModule } from '@angular/core';
import { TasksModule } from './tasks/tasks.module';
import { DbService } from './db.service';

@NgModule({
  declarations: [],
  imports: [TasksModule],
  exports: [TasksModule],
  providers: [DbService]
})
export class CoreModule {
}
