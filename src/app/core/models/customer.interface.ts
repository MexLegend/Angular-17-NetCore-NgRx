import { FormControl } from "@angular/forms";

export interface ICustomerForm {
  id: FormControl<string>;
  name: FormControl<string>;
  email: FormControl<string>;
  phone: FormControl<string>;
}


export interface ICustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
}
