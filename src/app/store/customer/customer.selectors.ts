import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICustomerState } from './customer.state';

const getcustomerstate = createFeatureSelector<ICustomerState>('customer');

export const selectIsLoadingCustomers = createSelector(
  getcustomerstate,
  (state) => state.isLoading
);

export const selectCutomersList = createSelector(getcustomerstate, (state) => {
  return state.customers!;
});

export const selectCutomersLength = createSelector(
  getcustomerstate,
  (state) => {
    return state.customers?.length;
  }
);

export const selectOneCustomer = createSelector(getcustomerstate, (state) => {
  return state.customer!;
});
