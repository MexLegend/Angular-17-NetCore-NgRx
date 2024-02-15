import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { loadCustomerAction } from '@store/customer/customer.actions';

import { ICustomer } from '@models/customer.interface';

import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { selectCutomerList } from '@store/customer/customer.selectors';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    AsyncPipe,
    MatCardModule,
    MatTableModule,
    MatButton,
    MatPaginatorModule,
  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
})
export class CustomerComponent implements OnInit {
  private readonly _store = inject(Store);

  customers$!: Observable<ICustomer[]>;
  dataSource!: MatTableDataSource<ICustomer>;
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this._store.dispatch(loadCustomerAction());
    this._store.select(selectCutomerList).subscribe((resp) => {
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  deletecustomer(code: string) {
    if (confirm('do you want to remove?')) {
      // this.store.dispatch(deleteCustomer({ code: code }));
    }
  }

  editcustomer(code: string) {
    // this.router.navigateByUrl('/customer/edit/'+code);
  }
}
