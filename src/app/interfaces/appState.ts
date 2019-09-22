import { products, OrderDetails, quantity } from './shard';

export interface appState {
    products: products[];
    orders: any[];
    quantity: number;
    orderDetails: OrderDetails[]
}