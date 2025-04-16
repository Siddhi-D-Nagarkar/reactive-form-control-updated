import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'any' })
export class CrudsimpleService {
  private baseUrl = 'https://gorest.co.in/public/v2/users';

  constructor(private http: HttpClient) {}

  // 🟢 CREATE: Add a new object
  createItem(item: any): Observable<any> {
    return this.http.post(this.baseUrl, item);
  }

  // 🟡 READ: Get all objects
  getItems(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // 🔄 UPDATE: Modify an object
  updateItem(id: string, updatedItem: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, updatedItem);
  }

  // 🔴 DELETE: Remove an object
  deleteItem(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // Get JSON to build Reactive Form
  getJson() {
    return [
      {
        type: 'text',
        label: 'Name',
        name: 'name',
        value: '',
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: 'Name is required',
          },
        ],
      },
      {
        type: 'email',
        label: 'Email',
        name: 'email',
        value: '',
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: 'Email is required',
          },
          {
            name: 'pattern',
            validator: 'email',
            message: 'Invalid email format',
          },
        ],
      },
    ];
  }
}
