import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';



const url = 'http://localhost:3000/shopping'; // http://localhost:3000/shopping

@Injectable({
    providedIn: 'root'
})
export class ShoppingService {
   productsInCart = new Array<any>();
    // productsInCart = [];
    totalPrice = new Subject<any>();

    constructor(private http: HttpClient, private userService: UserService) { }

    buyProduct(productId, quantity?) {
      return  this.http.post(url, {productId}, { headers: this.userService.getHeader() } );
    }


    getProductsFromCart() {
      return this.http.get(url + '/get-cart', {  headers: this.userService.getHeader() });
    }

    deletProductFromCart(id) {
      return this.http.post(url + '/remove-one-product', {id}, {  headers: this.userService.getHeader() });
    }
}
