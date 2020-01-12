import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ShoppingService } from 'src/app/services/shopping.service';
import { MatDialog } from '@angular/material';
import { ProductCardComponent } from 'src/app/products/product-card/product-card.component';


@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ShopCartComponent implements OnInit {
  productCart = [];
  prod = 'sss';
  finalProducts = [];
  currentIndex = -1 ;
  @Output() totalPrice = 0;
  @Output() productEmit = new EventEmitter<any>();

  constructor(private shopService: ShoppingService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.shopService.getProductsFromCart().subscribe(result => {
      if (result['success']) {
        this.productCart = result['products'];
        console.log(this.productCart);
        this.totalPrice = this.countTotalPrice(this.productCart);
        this.shopService.totalPrice.next(this.totalPrice);
      }
   });

  }

  truckFunc(index, product) {
    return product['_id'];
  }

  onMinus(_id) {
    for (const product of this.productCart) {
        if (product._id === _id) {
          product.count--;
        }
      }
     this.totalPrice = this.countTotalPrice(this.productCart);
     this.shopService.totalPrice.next(this.totalPrice);

  }

  onPlus(_id) {
    for (const product of this.productCart) {
        if (product._id === _id) {
          product.count++;
        }
      }
      this.totalPrice = this.countTotalPrice(this.productCart);
      this.shopService.totalPrice.next(this.totalPrice);

  }

  countTotalPrice (arrProducts) {
    let result = 0;
    for (const product  of arrProducts) {
       const sum = product.count * product.price;
       result += sum;
    }
    return result;
  }

  onDelete(_id) {
    const found = this.productCart.find(product => {
       return product._id === _id;
    });

    this.productCart.splice(this.productCart.indexOf(found), 1);
    this.totalPrice = this.countTotalPrice(this.productCart);
    this.shopService.totalPrice.next(this.totalPrice);

    console.log(7777111, _id);
    this.shopService.deletProductFromCart(_id).subscribe();
  }

  onContinue() {
    this.productEmit.emit(this.productCart);
  }

  onDetails(product) {
    console.log(334, product);
    const dialogRef = this.dialog.open(ProductCardComponent, {
      width: '250px',
      panelClass: 'custom-modalbox',
      data: {name: product.name, imageUrl: product.imageUrl,
            price: product.price, quantity: product.count}
    });
  }
}
