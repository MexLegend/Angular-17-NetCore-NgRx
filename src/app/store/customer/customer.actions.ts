import { ICustomer } from '@models/customer.interface';
import { RESPONSE_TYPE } from '@models/error.enum';
import { createAction, props } from '@ngrx/store';

export const LOAD_CUSTOMER = '[customer] load customer';
export const LOAD_CUSTOMER_SUCCESS = '[customer] load customer success';
export const LOAD_CUSTOMER_FAIL = '[customer] load customer fail';

export const GET_CUSTOMER = '[customer] get customer';
export const GET_CUSTOMER_SUCCESS = '[customer] get customer success';

export const ADD_CUSTOMER = '[customer] add customer';
export const ADD_CUSTOMER_SUCCESS = '[customer] add customer success';

export const UPDATE_CUSTOMER = '[customer] update customer';
export const UPDATE_CUSTOMER_SUCCESS = '[customer] update customer success';

export const DELETE_CUSTOMER = '[customer] delete customer';
export const DELETE_CUSTOMER_SUCCESS = '[customer] delete customer success';

export const SHOW_ALERT = '[customer] show alert';

export const loadCustomerAction = createAction(LOAD_CUSTOMER);
export const loadCustomerSuccessAction = createAction(
  LOAD_CUSTOMER_SUCCESS,
  props<{ customers: ICustomer[] }>()
);
export const loadCustomerFailAction = createAction(
  LOAD_CUSTOMER_FAIL,
  props<{ errorMessage: string }>()
);

export const getCustomerAction = createAction(
  GET_CUSTOMER,
  props<{ id: string }>()
);
export const getCustomerSuccessAction = createAction(
  GET_CUSTOMER_SUCCESS,
  props<{ customer: ICustomer }>()
);

export const addCustomerAction = createAction(
  ADD_CUSTOMER,
  props<{ customerData: ICustomer }>()
);
export const addCustomerSuccessAction = createAction(ADD_CUSTOMER_SUCCESS);

export const updateCustomerAction = createAction(
  UPDATE_CUSTOMER,
  props<{ customerData: ICustomer }>()
);
export const updateCustomerSuccessAction = createAction(UPDATE_CUSTOMER_SUCCESS);

export const deleteCustomerAction = createAction(
  DELETE_CUSTOMER,
  props<{ id: string }>()
);
export const deleteCustomerSuccessAction = createAction(
  DELETE_CUSTOMER_SUCCESS,
  props<{ id: string }>()
);

export const showAlertAction = createAction(
  SHOW_ALERT,
  props<{ message: string; resptype: RESPONSE_TYPE }>()
);
export const emptyAction = createAction('emptyaction');
