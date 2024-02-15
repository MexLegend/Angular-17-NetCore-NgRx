import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MasterService } from '@services/master.service';
import {
  addCustomerAction,
  addCustomerSuccessAction,
  deleteCustomerAction,
  deleteCustomerSuccessAction,
  emptyAction,
  getCustomerAction,
  getCustomerSuccessAction,
  loadCustomerAction,
  loadCustomerFailAction,
  loadCustomerSuccessAction,
  showAlertAction,
  updateCustomerAction,
  updateCustomerSuccessAction,
} from './customer.actions';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RESPONSE_TYPE } from '@models/error.enum';

@Injectable()
export class CustomerEffects {
  private readonly _action$ = inject(Actions);
  private readonly _service = inject(MasterService);
  private readonly _snackbar = inject(MatSnackBar);

  _loadCustomer = createEffect(() =>
    this._action$.pipe(
      ofType(loadCustomerAction),
      exhaustMap(() => {
        return this._service.getAllCustomers().pipe(
          map((data) => {
            return loadCustomerSuccessAction({ customers: data });
          }),
          catchError((_err) =>
            of(loadCustomerFailAction({ errorMessage: _err.message }))
          )
        );
      })
    )
  );

  _getCustomer = createEffect(() =>
    this._action$.pipe(
      ofType(getCustomerAction),
      exhaustMap((action) => {
        return this._service.getOneCustomerById(action.id).pipe(
          map((data) => {
            return getCustomerSuccessAction({ customer: data });
          }),
          catchError((_err) => of(emptyAction()))
        );
      })
    )
  );

  _addCustomer = createEffect(() =>
    this._action$.pipe(
      ofType(addCustomerAction),
      switchMap((action) => {
        return this._service.createCustomer(action.customerData).pipe(
          switchMap(() => {
            return of(
              addCustomerSuccessAction(),
              showAlertAction({
                message: 'Added successfully',
                resptype: RESPONSE_TYPE.SUCCESS,
              })
            );
          }),
          catchError((_err) =>
            of(
              showAlertAction({
                message: 'Failed to add',
                resptype: RESPONSE_TYPE.FAIL,
              })
            )
          )
        );
      })
    )
  );

  _updateCustomer = createEffect(() =>
    this._action$.pipe(
      ofType(updateCustomerAction),
      switchMap((action) => {
        return this._service.updateCustomer(action.customerData).pipe(
          switchMap(() => {
            return of(
              updateCustomerSuccessAction(),
              showAlertAction({
                message: 'Updated successfully',
                resptype: RESPONSE_TYPE.SUCCESS,
              })
            );
          }),
          catchError((_err) =>
            of(
              showAlertAction({
                message: 'Failed to update',
                resptype: RESPONSE_TYPE.FAIL,
              })
            )
          )
        );
      })
    )
  );

  _deleteCustomer = createEffect(() =>
    this._action$.pipe(
      ofType(deleteCustomerAction),
      switchMap((action) => {
        return this._service.deleteCustomer(action.id).pipe(
          switchMap(() => {
            return of(
              deleteCustomerSuccessAction({ id: action.id }),
              showAlertAction({
                message: 'Removed successfully',
                resptype: RESPONSE_TYPE.SUCCESS,
              })
            );
          }),
          catchError((_err) =>
            of(
              showAlertAction({
                message: 'Failed to delete',
                resptype: RESPONSE_TYPE.FAIL,
              })
            )
          )
        );
      })
    )
  );

  _showalert = createEffect(() =>
    this._action$.pipe(
      ofType(showAlertAction),
      exhaustMap((action) => {
        return this.showSnackbarAlert(action.message, action.resptype)
          .afterDismissed()
          .pipe(
            map(() => {
              return emptyAction();
            })
          );
      })
    )
  );

  showSnackbarAlert(
    message: string,
    resptype: RESPONSE_TYPE = RESPONSE_TYPE.FAIL
  ) {
    let _class = resptype === 'FAIL' ? 'text-green' : 'text-red';
    return this._snackbar.open(message, 'OK', {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 5000,
      panelClass: [_class],
    });
  }
}
