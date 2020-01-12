import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ProductService } from './../../services/product.service';
import { MatDatepickerInputEvent, MatDialog } from '@angular/material';
import { NgForm } from '@angular/forms';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  date: Date;
  categories = [];
  mode = 'indeterminate';
  hideCategory = false;

  editName; editPrice; editExpireIn; editQuantity; editImageUrl; editCategory; _id;

  constructor(
       public dialog: MatDialog,
       private productService: ProductService,
       private route: ActivatedRoute,
       private readonly notification: NotifierService,
     ) { }

  ngOnInit() {
    this.productService.getCategories()
      .subscribe((result) => {
        this.categories = result['categories'];
      });

    this.route.queryParams.subscribe(param => {
      this._id = param['_id'];
      this.editQuantity = param['quantity'];
      this.editExpireIn = param['expireIn'];
      this.editName = param['name'];
      this.editPrice = param['price'];
      this.editImageUrl = param['imageUrl'];
      this.editCategory = param['category'];
    });
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.date = event.value;
  }

  submitAddProduct(form: NgForm) {

    if (this.onMode()) {

      this.productService.addProduct({
        name: form.value.productName,
        price: form.value.price,
        expireIn: form.value.date,
        quantity: form.value.quantity,
        category: form.value.categoryId,
        imageUrl: form.value.imageUrl
      }).subscribe(result => {
        console.log(result);
      });
    } else {
      this.productService.editProduct({
        id: this._id,
        name: form.value.productName,
        price: form.value.price,
        expireIn: form.value.date,
        quantity: form.value.quantity,
        category: form.value.categoryId,
        imageUrl: form.value.imageUrl
      }).subscribe(result => {
        if (result['success']) {
          this.notification.notify('success', 'Successfully Edited');
        }
      });
    }
  }


  addNewCategory(type) {
    this.hideCategory = true;

    setTimeout(() => {
      this.productService.addCategory(type)
        .subscribe(result => {
          this.categories = result['categories'];
          this.hideCategory = false;
        });
    }, 1500);
  }


  onMode() {
    return this._id === undefined ? true : false;
  }
}
