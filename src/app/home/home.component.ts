import { Component, OnInit, DoCheck, ViewChild, ElementRef, AfterViewChecked, HostListener, ViewEncapsulation } from '@angular/core';


import { ProductService } from './../services/product.service';
import { Observable, of } from 'rxjs';
import { NotifierService } from 'angular-notifier';
import { ShoppingService } from '../services/shopping.service';
import { UserService } from '../services/user.service';
import { GlobalService } from '../services/global.service';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
 // encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, AfterViewChecked, DoCheck {
  constructor(private userService: UserService,
     private productServcie: ProductService,
     private readonly notification: NotifierService,
     private shopService: ShoppingService,
     private globalService: GlobalService) { }
  products = new Array<any>();
  prods = new Array();
  index = '2';
  disableScrollDown = false;
  @ViewChild('scrollDiv') scrollDiv: ElementRef;
  state = 'default';
  displayPrice = true;
  @ViewChild('price') priceDiv: ElementRef;
  hoverIndex = -1 ;
  checkPrice: boolean[] = [false, false, false];
  isSearching = false;
  productsFilter = [];
  color = 'blue';
  disabled = false;
  checked = false;
  isActiveSearch = false;

 @HostListener('input', ['$event.target.value'])
 onInput(value) {
  if (!value) {
    this.productServcie.getProducts(this.index)
    .subscribe((p: []) => {
        this.products.push(...p);
      this.products.map(prod => of(prod));
    });

  }
}

  ngOnInit() {
    this.productServcie.getProducts(this.index)
    .subscribe((p: []) => {

      this.products.push(...p);
      this.products.map(prod => of(prod));
    });

    this.productServcie.productList.subscribe((p: any) => {
     this.products = p;
    });

    this.globalService.serachActive.subscribe(cases => {
      this.isActiveSearch = cases;
    });
  }

  ngDoCheck() {

  }

  ngAfterViewChecked() {
    // this.scrollToBottom();
  }

  onScrol() {
    const element = this.scrollDiv.nativeElement;
    const atBottom = element.scrollHeight - element.scrollTop === element.clientHeight;
    if (atBottom) {
      this.disableScrollDown = false;
      console.log('end');
      this.index = (+this.index + 4).toString();

      this.productServcie.getProducts(this.index)
      .subscribe((p: []) => {

        this.products.push(...p);
        this.products.map(prod => of(prod));
      });

    } else {
      this.disableScrollDown = true;
      console.log('scroll');
    }
  }

  onRate(rating) {
    console.log(rating);
    this.notification.notify('success', 'Thank you for rating');
  }

  onHover(i) {
    this.hoverIndex = i;
  }

  onBuy(id) {
    console.log(444, id);
    this.shopService.buyProduct(id).subscribe();
  }

  catchBuyEvent(event: string) {
    console.log(event);
    this.shopService.buyProduct(event.toString()).subscribe();
    this.notification.notify('success', 'Added To Cart');
  }

  // trackFunc(index, item) {
  //   console.log(222, index, 33, item);
  //   return item['_id'];
  // }

  onPriceFilter(index) {

   for (let i = 0; i < this.checkPrice.length; i++) {
        this.checkPrice[i] = false;
   }

   switch (index) {
     case 0: console.log('ww');
    //  for (let i = 0; i < this.products.length; i++) {
    //      if (this.products[i]['price'] <= 200) {
    //        this.products.splice(i, 1);
    //      }
    //  }
    this.productServcie.getProductsFilter(210)
      .subscribe((prods: []) => {
        this.products.push(...prods);
        this.products.map(p => of(p));
      });
     break;

     case 1: console.log('ee');
     break;

     case 2: console.log('rr');
     break;
   }

 }

 onKeySearch(event) {
    this.products.filter(product => {
    if (product.name === event.target.value) {
      this.products = [];
     return this.products.push(product);
    }
    });
 }
}
