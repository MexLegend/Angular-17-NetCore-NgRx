import { ICustomer } from '@models/customer.interface';

export interface ICustomerState {
  customers: ICustomer | ICustomer[] | null;
  isLoading: boolean | null;
  errorMessage: string | null;
}
