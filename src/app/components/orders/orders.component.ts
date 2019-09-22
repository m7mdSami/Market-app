import { Component, OnInit, ViewChild } from '@angular/core';
import { eventDispatcher, store } from 'src/app/state/app-state';
import { Service, APIs } from '../../services/shard';
import { OrderDetails, products, users } from 'src/app/interfaces/shard';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: OrderDetails[];
  Products: products[];
  users: users[];
  displayedColumns: string[] = ['OrderId', 'UserName', 'Date', 'PaymentType', 'ProductPrice'];
  dataSource;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _service: Service,
    private router: Router) { }

  async ngOnInit() {
    await this.getProducts()
    await this.getUsers();
    await this.getOrders();
  }

  getOrders() {
    this._service.GetRequest<OrderDetails[]>(APIs.init().orders).subscribe(res => {
      this.orders = res;

      this.orders.map((e, i) => {
        e.Products.map(pp => {
          this.Products.map((p, ProductIndex)=> {
            if (p.ProductId == pp.ProductId) {
              pp.ProductIndex = ProductIndex;
              e.ProductPrice = e.ProductPrice ? e.ProductPrice + (pp.Quantity * p.ProductPrice) : (pp.Quantity * p.ProductPrice);
            }
          })
        });

        if(this.users){
          this.users.map(user => {
            if (user.Id == e.UserId) {
              e.userName = user.Name;
            }
          })
        }

      });
      this.dataSource = this.orders;
      this.dataSource.paginator = this.paginator;
    })
  }

  getUsers() {
    this._service.GetRequest<users[]>(APIs.init().users).subscribe(res => {
      this.users = res;
    })
  }

  getProducts() {
    this._service.GetRequest<products[]>(APIs.init().products).subscribe(res => {
      this.Products = res;
    })
  }

  orderDetails(data) {
    this.router.navigate([`/order-details`], { state: data });
  }

}
