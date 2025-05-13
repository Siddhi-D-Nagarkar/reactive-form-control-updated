
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-multi-checkbox',
  imports: [ReactiveFormsModule],
  templateUrl: './multi-checkbox.component.html',
  styleUrl: './multi-checkbox.component.css',
})
export class MultiCheckboxComponent {
  skillList = ['Java', 'Node', 'Angular']; // Available skills
  skillsForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.skillsForm = this.fb.group({
      selectedSkills: this.fb.array([]),
    });

    this.initializeCheckboxes(); // Initialize checkboxes
  }

  // Initialize checkboxes with false (unchecked)
  initializeCheckboxes() {
    const skillsArray = this.skillsForm.get('selectedSkills') as FormArray;
    this.skillList.forEach(() => skillsArray.push(this.fb.control(false)));
  }

  // Get FormArray controls for looping in the template
  get selectedSkillsArray() {
    return this.skillsForm.get('selectedSkills') as FormArray;
  }

  // 🟢 CREATE & UPDATE: Save Selected Skills
  saveSkills() {
    const selectedSkills = this.skillList.filter(
      (_, i) => this.selectedSkillsArray.at(i).value
    );
    console.log('Saved Skills:', this.skillsForm);
  }

  // 🟡 READ: Load Selected Skills
  loadSkills(selected: string[]) {
    this.skillList.forEach((skill, i) => {
      this.selectedSkillsArray.at(i).setValue(selected.includes(skill));
    });
  }

  // 🔴 DELETE: Clear All Selections
  clearSkills() {
    this.selectedSkillsArray.controls.forEach((control: any) =>
      control.setValue(false)
    );
  }
}
