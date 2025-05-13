
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'reactive-form-control';
  movieForm!: FormGroup;

  skillList = ['Java', 'Node', 'Angular'];

  public get genreList(): FormArray {
    return this.movieForm.get('genreList') as FormArray;
  }

  addField() {
    console.log('Clicked');
    this.genreList.push(this.fb.group({ age: this.fb.control('') }));
  }

  removeField(index: number) {
    this.genreList.removeAt(index);
  }

  public get selectedSkills(): FormArray {
    return this.movieForm.get('selectedSkills') as FormArray;
  }

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.movieForm = this.fb.group({
      genreList: this.fb.array([]),
      selectedSkills: this.fb.array([]),
    });
  }

  onClickSkill(e: any, index: number) {
    console.log('Skill Tapped :- ', e.target.value);
    console.log('Index Tapped :- ', index);
    console.log('Value checked or unchecked :-', e.target.checked);

    let isValueSelected = e.target.checked;
    if (isValueSelected) {
      this.selectedSkills.push(this.fb.control(this.skillList[index]));
    } else {
      this.selectedSkills.controls.forEach((control, index) => {
        if (control.value == e.target.value) {
          this.selectedSkills.removeAt(index);
        }
      });
    }
  }

  onPatch() {
    let selectedSkillFromDB = ['Java'];
    selectedSkillFromDB.forEach((skillEl) => {
      this.selectedSkills.push(this.fb.control(skillEl));
    });
  }

  selectSkillForUpdate(item: string) {
    console.log('checked');

    let selectedSkillFromDB = ['Java'];
    if (selectedSkillFromDB.length > 0) {
      let isPresent = true;
      return selectedSkillFromDB.findIndex((itemEL) => {
        return itemEL == item;
      }) == -1
        ? false
        : true;

      selectedSkillFromDB.forEach((skill) => {
        isPresent = skill == item ? true : false;
      });
    } else {
      return false;
    }
  }
  // {
  //   genreList: ["","",""]
  // }

  // {
  //   genreList: [{age:""},{""},{""}]
  // }

  onSubmit() {
    console.log(this.movieForm);
  }
}
