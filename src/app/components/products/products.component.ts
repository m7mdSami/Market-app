import { Component, OnInit } from '@angular/core';
import { Service, APIs } from '../../services/shard';
import { products } from '../../interfaces/shard';
import { eventDispatcher, store } from 'src/app/state/app-state';
import { ActionTypes } from 'src/app/state/action';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: products[];
  quantity: number = 0;

  constructor(
    private _service: Service,
    private alert: MatSnackBar
  ) { }

  ngOnInit() {
    store.subscribe(res => {
      if(res == null) {
        this.getProducts();
      } else {
        this.products = res.products;
        console.log(this.products)
      }
      if(res && res.quantity){
        this.quantity = res.quantity;
      }
    });
  }

  getProducts() {
    this._service.GetRequest<products[]>(APIs.init().products).subscribe(res => {
      eventDispatcher.next({ type: ActionTypes.PRODUCTS, payload: res});
    })
  }

  addToCard(index) {
    if(this.products[index].quantity == this.products[index].AvailablePieces) {
      this.openAlert(`Quantity is not available for ${this.products[index].ProductName}`)
    } else {      
      this.quantity += 1;
      this.products[index].quantity ? this.products[index].quantity += 1 : this.products[index].quantity = 1;
      eventDispatcher.next({ type: ActionTypes.QUANTITY, payload: this.quantity });
    }
  }

  removeToCard(index) {
    this.quantity -= 1;
    this.products[index].quantity -= 1;
    eventDispatcher.next({ type: ActionTypes.QUANTITY, payload: this.quantity });
  }

  openAlert(message: string) {
    this.alert.open(message, '', {
      duration: 8 * 1000,
    });
  }

}