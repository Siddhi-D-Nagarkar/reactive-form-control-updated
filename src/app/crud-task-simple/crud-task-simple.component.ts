import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { CrudsimpleService } from '../services/crudsimple.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-crud-task-simple',
  imports: [ReactiveFormsModule, NgClass, DragDropModule],
  templateUrl: './crud-task-simple.component.html',
  styleUrl: './crud-task-simple.component.css',
})
export class CrudTaskSimpleComponent implements OnInit {
  userForm: FormGroup;
  alertMessage: string = '';
  alertClass: string = '';
  userList: User[] = [];
  editUserEL: null | User = null;
  skills = ['Angular', 'Java', 'GoLang', 'Javascript'];
  constructor(private fb: FormBuilder, private apiService: CrudsimpleService) {
    this.userForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      gender: this.fb.control(null, [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      status: this.fb.control('', [Validators.required]),
      primarySkills: this.fb.array([]),
      addresses: this.fb.array([]),
    });
  }
  ngOnInit() {
    this.getUserList();

    // Default Check Box to false
    this.skills.forEach((skillEl) => {
      this.primarySkills.push(this.fb.control(false));
    });
  }
  //Getter for

  public get primarySkills(): FormArray {
    return this.userForm.get('primarySkills') as FormArray;
  }

  public get addresses(): FormArray {
    return this.userForm.get('addresses') as FormArray;
  }

  //CREATE
  onSubmit() {
    console.log(this.userForm);

    // Before Sending Data to Backend preparing data from MultiCHeckBox
    let selectedSkill: string[] = [];
    (this.primarySkills.value as []).forEach((isSkillSelected, index) => {
      console.log(isSkillSelected);
      if (isSkillSelected) {
        selectedSkill.push(this.skills[index]);
      }
    });
    console.log({ ...this.userForm.value, primarySkills: selectedSkill });

    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    if (!this.editUserEL) {
      this.apiService.createItem(this.userForm.value).subscribe({
        next: (data) => {
          console.log('Data Saved Successfully :- ', data);
          this.alertMessage = '✅ Data has been saved successfully!';
          this.alertClass = 'alert-success';
          this.userForm.reset();
          this.getUserList();
        },
        error: (err) => {
          this.alertMessage = '❌ Failed to save data. Please try again.';
          this.alertClass = 'alert-danger';
          console.log('Data Saving Failing', err);
        },
      });
    } else {
      this.apiService
        .updateItem(this.editUserEL.id.toString(), this.userForm.value)
        .subscribe({
          next: (data) => {
            this.alertMessage = 'User UPdated Successfully';
            this.alertClass = 'alert-success';
            this.editUserEL = null;
            this.getUserList();
            this.userForm.reset();
          },
          error: () => { },
        });
    }
  }

  // Get User List
  getUserList() {
    this.apiService.getItems().subscribe({
      next: (data: User[]) => {
        this.userList = data;
      },
      error: (err) => {
        console.log('Error While Getting Data');
      },
    });
  }

  // Delete User
  onDelete(userId: number) {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this item?'
    );
    if (!confirmDelete) return;
    this.apiService.deleteItem(userId.toString()).subscribe({
      next: (data) => {
        this.alertMessage = 'Data Got Delete Successfully';
        this.alertClass = 'alert-success';
        console.log('Data Deleted');
        this.getUserList();
      },
      error: (err) => { },
    });
  }

  //Edit User
  onClickEditUser(userEl: User) {
    this.editUserEL = userEl;

    // Adding Data From Backend to UI for MultiCheck Box
    let backendResponse = {
      selectedSkillFromBackend: ['GoLang'],
    };
    let defaultSkillValue = [false, false, false, false];
    this.skills.forEach((skillEl, index) => {
      backendResponse.selectedSkillFromBackend.includes(skillEl);
      defaultSkillValue[index] =
        backendResponse.selectedSkillFromBackend.includes(skillEl)
          ? true
          : false;
    });

    // Firstly Clear the FormArray and then Push for Connecting the Backend Data for Dyanmic COntrols
    this.addresses.clear();
    this.addresses.push(this.fb.control('RAVI'));
    this.addresses.push(this.fb.control('RAIGAD'));

    this.userForm.patchValue({ ...userEl, primarySkills: defaultSkillValue });
  }

  isInvalid(controlName: string): boolean {
    const control = this.userForm.get(controlName);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  validationMessage(controlName: string) {
    const control = this.userForm.get(controlName);

    if (!control || !control.errors || !(control.touched || control.dirty)) {
      return '';
    }

    const errors = control.errors;
    for (let errorName in errors) {
      switch (errorName) {
        case 'required':
          return `${this.toLabel(controlName)} is required`;

        case 'email':
          return `Please enter a valid ${this.toLabel(controlName)}`;

        case 'minlength':
          return `${this.toLabel(controlName)} must be at least ${errors['minlength'].requiredLength
            } characters`;

        case 'maxlength':
          return `${this.toLabel(controlName)} must be at most ${errors['maxlength'].requiredLength
            } characters`;

        case 'pattern':
          return `${this.toLabel(controlName)} format is invalid`;

        case 'usernameTaken':
          return `This username is already taken`;

        case 'passwordMismatch':
          return `Passwords do not match`;

        // Add more custom errors here as needed

        default:
          return `${this.toLabel(controlName)} is invalid`;
      }
    }

    return '';
  }

  private toLabel(controlName: string): string {
    // Converts control names to user-friendly field names
    switch (controlName) {
      case 'email':
        return 'Email';
      case 'name':
        return 'Name';
      case 'gender':
        return 'Gender';
      case 'status':
        return 'Status';
      case 'username':
        return 'Username';
      case 'password':
        return 'Password';
      case 'confirmPassword':
        return 'Confirm Password';
      default:
        return controlName.charAt(0).toUpperCase() + controlName.slice(1);
    }
  }

  closeAlert() {
    this.alertMessage = '';
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.userList, event.previousIndex, event.currentIndex);
  }

  //Add address control
  onAddAddressControl() {
    this.addresses.push(this.fb.control(''));
  }

  //Remove Address Control
  removeAddressControl(index: number) {
    this.addresses.removeAt(index);
  }
}
