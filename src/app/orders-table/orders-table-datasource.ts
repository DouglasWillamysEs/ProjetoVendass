import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface OrdersTableItem {

  id: number;
  name: string;
  data: string;
  status: string;
  orderTotal: number;
  paymentMode: string;

}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: OrdersTableItem[] = [
  {id: 1, name: 'Douglas ', data: '25/05/2022', status: 'Vendido', orderTotal: 34, paymentMode: 'Pix'},
  {id: 2, name: 'Gabriela', data: '25/05/2022', status: 'Vendido', orderTotal: 25, paymentMode: 'Cartão'},
  {id: 3, name: 'Miguel', data: '25/05/2022', status: 'Vendido', orderTotal: 64, paymentMode: 'Pix'},
  {id: 4, name: 'Gabriel', data: '25/05/2022', status: 'Vendido', orderTotal: 24, paymentMode: 'Pix'},
  {id: 5, name: 'Davi', data: '25/05/2022', status: 'Vendido', orderTotal: 14, paymentMode: 'Cartão'},
  {id: 6, name: 'Arthur', data: '25/05/2022', status: 'Vendido', orderTotal: 64, paymentMode: 'Pix'},
  {id: 7, name: 'Reginaldo', data: '25/05/2022', status: 'Vendido', orderTotal: 65, paymentMode: 'Cartão'},
  {id: 8, name: 'Nicolas', data: '25/05/2022', status: 'Vendido', orderTotal: 12, paymentMode: 'Boleto'},
  {id: 9, name: 'João', data: '25/05/2022', status: 'Vendido', orderTotal: 23, paymentMode: 'Boleto'},
  {id: 10, name: 'Ricardo', data: '25/05/2022', status: 'Vendido', orderTotal: 32, paymentMode: 'Pix'},
];

/**
 * Data source for the OrdersTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class OrdersTableDataSource extends DataSource<OrdersTableItem> {
  data: OrdersTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<OrdersTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: OrdersTableItem[]): OrdersTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: OrdersTableItem[]): OrdersTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
