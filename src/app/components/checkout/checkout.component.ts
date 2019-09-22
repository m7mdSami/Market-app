import { Component, OnInit } from '@angular/core';
import { store } from 'src/app/state/app-state';
import { products } from 'src/app/interfaces/shard';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  products: products[];
  displayedColumns: string[] = ['ProductName', 'ProductImg', 'ProductPrice', 'AvailablePieces', 'Quantity'];
  total: any;

  constructor() { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    store.subscribe(res => {
      if(res){
        this.products = res.products.filter(product => {
          if (product.quantity) {
            this.total = this.total ? this.total + (product.quantity * product.ProductPrice) : product.quantity * product.ProductPrice; 
            return product
          } else {
            return false;
          }
        });
      }
    });
  }
}
