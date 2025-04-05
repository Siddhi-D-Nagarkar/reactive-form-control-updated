import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CrudsimpleService } from '../../services/crudsimple.service';

@Component({
  selector: 'app-crud-task-simple',
  imports: [ReactiveFormsModule, NgClass, NgIf, NgFor],
  templateUrl: './crud-task-simple.component.html',
  styleUrl: './crud-task-simple.component.css',
})
export class CrudTaskSimpleComponent implements OnInit {
  userForm!: FormGroup;
  alertMessage: string = '';
  alertClass: string = '';
  userList: any[] = [];
  editUserEL: null | any = null;
  constructor(private fb: FormBuilder, private apiService: CrudsimpleService) {}
  ngOnInit() {
    this.getUserList();
    this.userForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      gender: this.fb.control(null, [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      status: this.fb.control('', [Validators.required]),
    });
  }
  //CREATE
  onSubmit() {
    console.log(this.userForm);
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
        .updateItem(this.editUserEL.id, this.userForm.value)
        .subscribe({
          next: (data) => {
            this.alertMessage = 'User UPdated Successfully';
            this.alertClass = 'alert-success';
            this.editUserEL = null;
            this.getUserList();
            this.userForm.reset();
          },
          error: () => {},
        });
    }
  }

  // Get User List
  getUserList() {
    this.apiService.getItems().subscribe({
      next: (data) => {
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
      error: (err) => {},
    });
  }

  //Edit User
  onClickEditUser(userEl: any) {
    this.editUserEL = userEl;
    this.userForm.patchValue(userEl);
  }

  isInvalid(controlName: string): boolean {
    switch (controlName) {
      case '':
        return false;
        break;
      case '':
        return false;

      default:
        const control = this.userForm.get(controlName);
        return !!(
          control &&
          control.invalid &&
          (control.touched || control.dirty)
        );
        break;
    }
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
          return `${this.toLabel(controlName)} must be at least ${
            errors['minlength'].requiredLength
          } characters`;

        case 'maxlength':
          return `${this.toLabel(controlName)} must be at most ${
            errors['maxlength'].requiredLength
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
}
