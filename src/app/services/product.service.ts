import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserService } from './user.service';
import { Subject } from 'rxjs';



const url = 'api'; // http://localhost:3000/api;

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  searchDivToggle = new Subject<boolean>();
  productList = new Subject<Object>();
  notificationBadge = new Subject();


  constructor(private http: HttpClient, private userService: UserService) { }

  addCategory(type: string) {
    return this.http.post(url + '/new-category', { type }, { headers: this.userService.getHeader() });
  }

  getCategories() {
    return this.http.get(url + '/get-categories', { headers: this.userService.getHeader() });
  }

  addProduct(product) {
    return this.http.post(url + '/new-product', { product }, { headers: this.userService.getHeader() });
  }

  addProduct2(formData) {
    return this.http.post(url + '/new-product-image', formData, { headers: this.userService.getHeader() });

  }

  searchProductByName(name, category?) {
    name = name.trim();
    return this.http.post(url + '/search-prouduct-by-name', { name: name});
  }

  getProducts(idx?) {
    return this.http.get(url + '/products', { headers: { index: idx } });
  }

  getProductsNoIndex(idx?) {
    return this.http.get(url + '/products-no-index', { headers: this.userService.getHeader() });
  }

  editProduct(product) {
    return this.http.post(url + '/edit-Product', { product }, { headers: this.userService.getHeader() });
  }

  getProductsFilter(price?, category?, alcohol?) {
    return this.http.post(url + '/products-filter', {params: {price, category, alcohol}});
  } 
   deleteProduct(id) {
    return this.http.post(url + '/delete-product', {id}, { headers: this.userService.getHeader() });
  }

}
