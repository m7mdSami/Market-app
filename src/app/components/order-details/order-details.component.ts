import { Component, OnInit } from '@angular/core';
import { OrderDetails, products, users } from 'src/app/interfaces/shard';
import { Router } from '@angular/router';
import { Service, APIs } from 'src/app/services/shard';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  orderDetails:OrderDetails = window.history.state;
  displayedColumns: string[] = ['ProductName', 'ProductImg', 'ProductPrice', 'AvailablePieces', 'Quantity'];
  products:products[];
  user:users;

  constructor(
    private router: Router,
    private _service: Service
  ) { 
    if(!this.orderDetails.OrderId){
      this.router.navigate(['/']);
    }
  }

  async ngOnInit() {
    let AllProducts = await this.getProducts();
    await this.getUsers(this.orderDetails.UserId);
    console.log(this.user)
    this.products = await this.orderDetails.Products.map(p => AllProducts[p.ProductIndex]);
  }

  getProducts() {
    let promise = new Promise((resolve) => {
      this._service.GetRequest<products[]>(APIs.init().products).subscribe(res => {
        resolve(res)
      })
    })
    return promise;
  }

  getUsers(UserId) {
      this._service.GetRequest<users[]>(APIs.init().users).subscribe(res => {
        res.map((user:users) => {
          if(user.Id == UserId){
            this.user = user
          }
        })
      })
  }

}
