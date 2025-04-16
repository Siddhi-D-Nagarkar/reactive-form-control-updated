import { Routes } from '@angular/router';
import { MultiCheckboxComponent } from './multi-checkbox/multi-checkbox.component';
import { CrudTaskComponent } from './crud-task/crud-task.component';
import { CrudTaskSimpleComponent } from './crud-task-simple/crud-task-simple.component';
import { DragdroppracticeComponent } from './dragdroppractice/dragdroppractice.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';

export const routes: Routes = [
  { path: 'first-component', component: MultiCheckboxComponent },
  { path: 'crud', component: CrudTaskComponent },
  { path: 'crud-simple', component: CrudTaskSimpleComponent },
  { path: 'drag', component: DragdroppracticeComponent },
  { path: 'dynamic-form', component: DynamicFormComponent },
];
