import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ICustomer } from '@models/customer.interface';
import { IPost } from '@models/post.interface';
import { URL_CUSTOMERS, URL_POSTS } from '@constants/api-urls.constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  private _http = inject(HttpClient);

  getAllPosts(): Observable<IPost[]> {
    return this._http.get<IPost[]>(URL_POSTS);
  }

  getAllCustomers(): Observable<ICustomer[]> {
    return this._http.get<ICustomer[]>(URL_CUSTOMERS);
  }

  getOneCustomerById(customerId: string) {
    return this._http.get<ICustomer>(`${URL_CUSTOMERS}/${customerId}`);
  }

  createCustomer(customer: ICustomer) {
    return this._http.post(URL_CUSTOMERS, customer);
  }

  updateCustomer(customer: ICustomer) {
    return this._http.put(`${URL_CUSTOMERS}/${customer.id}`, customer);
  }

  deleteCustomer(customerId: string) {
    return this._http.delete(`${URL_CUSTOMERS}/${customerId}`);
  }

  haveAccess() {
    return true;
  }
}
