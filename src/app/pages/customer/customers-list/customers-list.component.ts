import { Component, ViewChild, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable, Subject, takeUntil } from 'rxjs';

import { Store } from '@ngrx/store';
import {
  deleteCustomerAction,
  loadCustomerAction,
} from '@store/customer/customer.actions';

import { ICustomer } from '@models/customer.interface';

import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { selectCutomersList } from '@store/customer/customer.selectors';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-customers-list',
  standalone: true,
  imports: [
    AsyncPipe,
    MatCardModule,
    MatTableModule,
    MatButton,
    MatPaginatorModule,
    RouterLink,
  ],
  templateUrl: './customers-list.component.html',
  styleUrl: './customers-list.component.scss',
})
export class CustomersListComponent {
  private readonly _store = inject(Store);
  private readonly _router = inject(Router);
  private readonly _unsubscribe$: Subject<void> = new Subject<void>();

  customers$!: Observable<ICustomer[]>;
  dataSource!: MatTableDataSource<ICustomer>;
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getCustomers();
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.unsubscribe();
  }

  getCustomers() {
    this._store.dispatch(loadCustomerAction());
    this._store
      .select(selectCutomersList)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((resp) => {
        this.dataSource = new MatTableDataSource(resp);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  deletecustomer(id: string) {
    if (confirm('Do you want to remove?')) {
      this._store.dispatch(deleteCustomerAction({ id }));
    }
  }

  editcustomer(id: string) {
    this._router.navigateByUrl(`/customer/edit/${id}`);
  }
}
