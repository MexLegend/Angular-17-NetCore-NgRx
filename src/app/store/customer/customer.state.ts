import { ICustomer } from '@models/customer.interface';

export interface ICustomerState {
  customers: ICustomer[] | null;
  customer: ICustomer | null;
  isLoading: boolean | null;
  errorMessage: string | null;
}
