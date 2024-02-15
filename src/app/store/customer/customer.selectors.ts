import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICustomerState } from './customer.state';
import { ICustomer } from '@models/customer.interface';

const getcustomerstate = createFeatureSelector<ICustomerState>('customer');

export const selectIsLoadingCustomers = createSelector(
  getcustomerstate,
  (state) => state.isLoading
);

export const selectCutomerList = createSelector(getcustomerstate, (state) => {
  return state.customers as ICustomer[];
});

export const selectOneCustomer = createSelector(getcustomerstate, (state) => {
  return state.customers as ICustomer;
});
