import { Routes } from '@angular/router';
import { MultiCheckboxComponent } from './multi-checkbox/multi-checkbox.component';
import { CrudTaskComponent } from './crud-task/crud-task.component';
import { CrudTaskSimpleComponent } from './crud-task-simple/crud-task-simple.component';

export const routes: Routes = [
  { path: 'first-component', component: MultiCheckboxComponent },
  { path: 'crud', component: CrudTaskComponent },
  { path: 'crud-simple', component: CrudTaskSimpleComponent },
];
