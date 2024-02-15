import { Action, createReducer, on } from '@ngrx/store';
import { ICustomerState } from './customer.state';
import {
  deleteCustomerSuccessAction,
  getCustomerSuccessAction,
  loadCustomerFailAction,
  loadCustomerSuccessAction,
} from './customer.actions';
import { ICustomer } from '@models/customer.interface';

export const initialCustomerState: ICustomerState = {
  customers: null,
  errorMessage: null,
  isLoading: false,
};

const _customerReducer = createReducer(
  initialCustomerState,
  on(loadCustomerSuccessAction, (state, action) => {
    return {
      ...state,
      customers: action.customers,
      errorMessage: null,
      isLoading: false,
    };
  }),
  on(getCustomerSuccessAction, (state, action) => {
    return {
      ...state,
      customers: action.customer,
      isLoading: false,
    };
  }),
  on(loadCustomerFailAction, (state, action) => {
    return {
      ...state,
      customers: [],
      errormessage: action.errorMessage,
      isLoading: false,
    };
  }),
  on(deleteCustomerSuccessAction, (state, action) => {
    const _newdata = (state.customers as ICustomer[])!.filter(
      (o) => o.id != action.id
    );
    return {
      ...state,
      customers: _newdata,
      errormessage: null,
      isLoading: false,
    };
  })
);

export const customerReducer = (
  state: ICustomerState | undefined,
  action: Action
) => {
  return _customerReducer(state, action);
};
