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

  getOneCustomerById(userId: string) {
    return this._http.get<ICustomer>(`${URL_CUSTOMERS}/${userId}`);
  }

  createCustomer(customer: ICustomer) {
    return this._http.post(
      'https://localhost:7143/api/Customer/Create',
      customer
    );
  }

  updateCustomer(customer: ICustomer) {
    return this._http.put(
      'https://localhost:7143/api/Customer/Update?code=' + customer.id,
      customer
    );
  }

  deleteCustomer(code: string) {
    return this._http.delete(
      'https://localhost:7143/api/Customer/Remove?code=' + code
    );
  }

  haveAccess() {
    return true;
  }
}
