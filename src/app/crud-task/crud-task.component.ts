import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

import { catchError, from, map, of, retry } from 'rxjs';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-crud-task',
  imports: [ReactiveFormsModule],
  templateUrl: './crud-task.component.html',
  styleUrl: './crud-task.component.css',
})
export class CrudTaskComponent implements OnInit {
  itemForm: FormGroup;
  itemList: any[] = [];
  editingItemId: number | null = null;
  locations: string[] = ['Surat', 'Nashik', 'Ahmedabad'];

  constructor(private fb: FormBuilder, private apiService: CrudService) {
    this.itemForm = this.fb.group({
      name: [''],
      year: [''],
      price: [''],
      cpuModel: [''],
      hardDiskSize: [''],
      color: [''],
      specifications: this.fb.array([]), // Dynamic array for RAM & ROM
      relocatePossible: this.fb.control('Yes'),
      city: this.fb.control(''),
    });
  }
  ngOnInit() {
    this.getItems();
  }

  // Getter for RAM & ROM FormArray
  get specifications(): FormArray {
    return this.itemForm.get('specifications') as FormArray;
  }

  // Add a new RAM & ROM entry
  addSpecification(): void {
    const specGroup = this.fb.group({
      ramSize: [''],
      romSize: [''],
    });
    this.specifications.push(specGroup);
  }

  // Remove a RAM & ROM entry
  removeSpecification(index: number): void {
    this.specifications.removeAt(index);
  }

  // Add item to the list
  addItem(): void {
    // if (this.itemForm.valid) {
    //   const newItem = { id: Date.now(), ...this.itemForm.value };
    //   this.itemList.push(newItem);
    //   this.itemForm.reset();
    //   this.specifications.clear(); // Clear dynamic fields after adding
    // }

    console.log(this.itemForm);
  }

  // Edit an existing item
  editItem(item: any): void {
    this.editingItemId = item.id;
    this.itemForm.patchValue(item);
    this.specifications.clear();

    if (item.specifications) {
      item.specifications.forEach((spec: any) => {
        this.specifications.push(this.fb.group(spec));
      });
    }
  }

  // Update the selected item
  updateItem(): void {
    if (this.itemForm.valid && this.editingItemId !== null) {
      const index = this.itemList.findIndex(
        (item) => item.id === this.editingItemId
      );
      if (index !== -1) {
        this.itemList[index] = {
          id: this.editingItemId,
          ...this.itemForm.value,
        };
      }
      this.itemForm.reset();
      this.specifications.clear();
      this.editingItemId = null;
    }
  }

  // Delete an item
  deleteItem(id: number): void {
    this.itemList = this.itemList.filter((item) => item.id !== id);
  }

  // Get Item List
  getItems() {
    from(['Siddhi', 'Nagarkar', 'MALE']).subscribe((data) => {
      console.log(data);
    });

    this.apiService
      .getItems()
      .pipe(
        retry(2),
        map((value) => {
          return { data: value };
        }),
        catchError((err) => {
          return of('Fallback Value');
        })
      )
      .subscribe((data) => {
        console.log('Data Got Successfully :- ', data);
      });
  }

  //Unary Function
}
