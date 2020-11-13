import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

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


  selectedFile: File = null;
  fd = new FormData();
  imagePath;
  imgURL;
  @ViewChild('fileInput') fileInput;

  addFile(): void {
    let fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
        let fileToUpload = fi.files[0];
        this.fd.append('photo', fileToUpload);
        }
    }

  createFormData(event) {
    this.selectedFile = <File>event.target.files[0];
    this.fd.append('photo', this.selectedFile, this.selectedFile.name);

    const reader = new FileReader();
    this.imagePath = this.selectedFile;
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
  };
  }

  constructor(
       public dialog: MatDialog,
       private productService: ProductService,
       private route: ActivatedRoute,
       private readonly notification: NotifierService,
       private router: Router
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
     if (this.selectedFile) {
       this.fd.append('name', form.value.productName);
       this.fd.append('price', form.value.price);
       this.fd.append('expireIn', form.value.date);
       this.fd.append('category', form.value.categoryId);
       this.fd.append('quantity', form.value.quantity);
       this.productService.addProduct2(this.fd).subscribe(data => {
         if (data['success'] === true) {
           form.reset();
           this.router.navigate(['/new-product']);
         }
       });

     } else {
      this.productService.addProduct({
        name: form.value.productName,
        price: form.value.price,
        expireIn: form.value.date,
        quantity: form.value.quantity,
        category: form.value.categoryId,
        imageUrl: form.value.imageUrl

      }).subscribe(result => {
        console.log(result);
        form.reset();
      });
     }

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
