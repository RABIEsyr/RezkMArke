import { Component, OnInit, DoCheck, ViewChild, ElementRef, AfterViewChecked, HostListener, ViewEncapsulation, OnDestroy } from '@angular/core';


import { ProductService } from './../services/product.service';
import { Observable, of } from 'rxjs';
import { NotifierService } from 'angular-notifier';
import { ShoppingService } from '../services/shopping.service';
import { UserService } from '../services/user.service';
import { GlobalService } from '../services/global.service';


declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
 // encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, AfterViewChecked, DoCheck, OnDestroy {
  
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
  isBuy = false;

  constructor(private userService: UserService,
    private productServcie: ProductService,
    private readonly notification: NotifierService,
    private shopService: ShoppingService,
    private globalService: GlobalService) { }

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
      console.log(this.products)

      this.shopService.getProductsFromCart().subscribe(ps => {
        console.log('home-ps', ps['products']);

        this.products.filter(item1 => {
          ps['products'].some(item2 => {
            if (item2._id === item1._id ) {
              item1.count = item2.count;
             return item1.exist = true;
            } else {
              return item1.exist = false;
            }
          });
        });

        for (let i = 0; i < ps['products'].length; i++) { 
          console.log('33',ps['products'][i])
        }


        this.products.map(prod => of(prod));
      });


    });

    // this.productServcie.productList.subscribe((p: any) => {
    //  this.products = p;
    // });

    this.globalService.serachActive.subscribe(cases => {
      this.isActiveSearch = cases;
    });

   
    
  }

  ngDoCheck() {

  }

  ngAfterViewChecked() {
    // this.scrollToBottom();
  }

  onAnimate() {
    
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
        for (let i = 0; i < p.length; i++) {
          for (let j = 0; j < this.products.length; j++) {
            if (p[i]['_id'] === this.products[j]._id) {
              p.splice(i, 1);
            }
          }
         }
        this.products.push(...p);

        this.shopService.getProductsFromCart().subscribe(ps => {
          this.products.filter(item1 => {
            ps['products'].some(item2 => {
              if (item2._id === item1._id ) {
                item1.count = item2.count;
               return item1.exist = true;
              } else {
                return item1.exist = false;
              }
            });
          });
        this.products.map(prod => of(prod));
        });

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

  catchBuyEvent(event) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i]._id === event) {
        this.products[i].exist = true;
        this.products[i].count = 1;
      }
    }
    this.shopService.buyProduct(event).subscribe();
    this.notification.notify('success', 'Added To Cart');

    //this.isBuy = true;
   //setTimeout( function ()  {  this.isBuy = false; }.bind(this), 6000);

    //   $('.add-to-cart').on('click', function () {
    //   var cart = $('.shopping-cart');
    //   var imgtodrag = $(this);
    //   if (imgtodrag) {
    //       var imgclone = imgtodrag.clone()
    //           .offset({
    //           top: imgtodrag.offset().top,
    //           left: imgtodrag.offset().left
    //       })
    //           .css({
    //           'opacity': '0.5',
    //               'position': 'absolute',
    //               'height': '150px',
    //               'width': '150px',
    //               'z-index': '100'
    //       })
    //           .appendTo($('body'))
    //           .animate({
    //           'top': cart.offset().top + 10,
    //               'left': cart.offset().left + 10,
    //               'width': 75,
    //               'height': 75
    //       }, 1000, 'easeInOutExpo');

    //       setTimeout(function () {
    //         (<any>$('.shopping-cart')).effect("shake", {
    //               times: 2
    //           }, 200);
    //       }, 1500);

    //       imgclone.animate({
    //           'width': 0,
    //               'height': 0
    //       }, function () {
    //           $(this).detach()
    //       });
    //   }
    // });
    
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
 onCloseSearch() {
   this.isActiveSearch = false;
 }
 
 catchMinus(event) {
   for (let i = 0; i < this.products.length; i++) {
     if (this.products[i]._id === event) {
       if (this.products[i].count === 1) {
        this.shopService.deletProductFromCart(event).subscribe();
        this.products[i].exist = false;
       } else {
        this.products[i].count--;
        this.shopService.deletProductFromCart(event).subscribe();
       }
     }
   }
 
  
 }

 catchPlus(event) {
  for (let i = 0; i < this.products.length; i++) {
    if (this.products[i]._id === event) {
       this.products[i].count++;
       this.shopService.buyProduct(event).subscribe();
    }
  }

 }

 ngOnDestroy() {

 }
}
