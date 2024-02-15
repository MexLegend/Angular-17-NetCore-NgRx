import { Component, OnInit, inject } from '@angular/core';
import {
  addCustomerAction,
  getCustomerAction,
  loadCustomerAction,
  updateCustomerAction,
} from '@store/customer/customer.actions';
import {
  selectCutomersLength,
  selectOneCustomer,
} from '@store/customer/customer.selectors';

import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ICustomer, ICustomerForm } from '@models/customer.interface';
import { Store } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.scss',
})
export class AddCustomerComponent implements OnInit {
  private readonly _fb = inject(NonNullableFormBuilder);
  private readonly _store = inject(Store);
  private readonly _actRoute = inject(ActivatedRoute);
  private readonly _unsubscribe$: Subject<void> = new Subject<void>();

  currentCustomerId = '';
  pagetitle = 'Add Customer';
  form!: FormGroup<ICustomerForm>;

  constructor() {
    this.form = this._fb.group<ICustomerForm>({
      id: this._fb.control({ value: '', disabled: true }, Validators.required),
      name: this._fb.control('', Validators.required),
      email: this._fb.control('', Validators.required),
      phone: this._fb.control('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.currentCustomerId = this._actRoute.snapshot.paramMap.get(
      'id'
    ) as string;

    if (this.currentCustomerId) {
      this.pagetitle = 'Edit customer';

      this._store.dispatch(getCustomerAction({ id: this.currentCustomerId }));
      this._store
        .select(selectOneCustomer)
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe((customer) => {
          this.form.setValue(customer);
        });
    } else {
      this._store.dispatch(loadCustomerAction());
      this._store
        .select(selectCutomersLength)
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe((length) => {
          if (length) this.form.controls.id.setValue((length + 1).toString());
        });
    }
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.unsubscribe();
  }

  saveCustomer() {
    if (this.form.valid) {
      const customerData: ICustomer = this.form.getRawValue();

      this.currentCustomerId
        ? this._store.dispatch(updateCustomerAction({ customerData }))
        : this._store.dispatch(addCustomerAction({ customerData }));
    }
  }
}
