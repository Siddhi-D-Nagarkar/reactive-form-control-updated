import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CrudsimpleService } from '../../services/crudsimple.service';
import { NgFor } from '@angular/common';
import { FormConfig } from '../../models/formConfig.model';
import { ColorChangeDirective } from '../../directives/color-change.directive';

@Component({
  selector: 'app-dynamic-form',
  imports: [ReactiveFormsModule, NgFor,ColorChangeDirective],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css',
})
export class DynamicFormComponent implements OnInit {
  userForm!: FormGroup;
  formConfig!: FormConfig[];
  constructor(public apiService: CrudsimpleService, private fb: FormBuilder) {}

  ngOnInit(): void {
    console.log(this.apiService.getJson());
    this.formConfig = this.apiService.getJson();
    this.initForm();
  }

  initForm() {
    const controls: any = {};
    this.formConfig.forEach((formConfigEl) => {
      let validators: Validators[] = [];
      formConfigEl.validations.forEach((validatorsEl) => {});
      // TODO Need to add the validation by comparing text
      controls[formConfigEl.name] = [formConfigEl.value || '', validators];
    });

    console.log('Control Object :- ', controls);

    this.userForm = this.fb.group(controls);

    console.log('userForm :-', this.userForm);
  }

  onSubmit() {
    console.log(this.userForm);
  }
}
