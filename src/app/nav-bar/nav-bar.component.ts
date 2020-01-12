import { HttpClient } from '@angular/common/http';
import { Component, OnInit, DoCheck, ViewEncapsulation, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { filesaver } from 'filesaver';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';
import { GlobalService } from '../services/global.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class NavBarComponent implements OnInit, DoCheck {
  project;
  apiUrl;
  navbarOpen = false;
  initSlide = false;
  uname: Observable<string>;
  searchDiv;
  productList: Observable<Object>;
  searchTerm = new Subject<string>();
  categories;
  category;
  n;
  @ViewChild('gnIcon') menu: ElementRef;
  @ViewChild('gnWrapper') wrapper: ElementRef;
  isAdmin: Observable<boolean>;
  private _opened = false;
  collaps_expand_sidebar = true;
  show_hide_sidebar = false;
  imgPath;

  


  constructor(private userService: UserService,
     private productService: ProductService, private router: Router,
     private globalService: GlobalService, private httpClient: HttpClient,
     private sanitizer: DomSanitizer,
     private socket: Socket
     ) {
    this.uname = userService.User;
   }



  ngOnInit() {
    this.searchTerm.pipe(
      debounceTime(300),
      switchMap((term) => this.productService.searchProductByName(term) )
    ).subscribe(p => {
      this.productService.productList.next(p);
    });


    this.productService.getCategories()
      .subscribe(categs => {
        this.categories = categs['categories'];
      });

      this.n = this.productService.notificationBadge;

      this.globalService.windowWidth.subscribe(size => {
          if (size <= 700) {
              this.show_hide_sidebar = false;
          }
      });

      this.userService.getProfilePicture()
        .subscribe(photo => {
             console.log('photo11', photo);
            this.imgPath = photo;
      });
      
      this.globalService.profilePicture.subscribe(photo => {
        this.imgPath = photo;
      });

      this.socket.on('upload-photo', message => {
        console.log('8877777', message);
      });
  }
  transform() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.imgPath);
}

  ngDoCheck() {
    this.userService.openSlide.subscribe(slideOpenClose => {
      this.initSlide = slideOpenClose;
    });
    this.isAdmin = of(this.userService.isAdmin());

  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  toggleSilde() {
    this.userService.openSlide.next(this.initSlide);

  }

  checkAuthentication() {
    return this.userService.isAuthenticated();
  }

  checkIsAdmin() {
    return this.userService.isAdmin();
  }

  onLogout() {
    localStorage.removeItem('token');
  }

  onSearchProduct(value, category?) {
    this.searchTerm.next(value);
    console.log(4422, value);
    //this.category = category;
   // console.log(category);
  }

  onToggleSearch() {
    this.searchDiv = !this.searchDiv;
    this.productService.searchDivToggle.next(this.searchDiv);
  }


  onSignin() {
    this.router.navigate(['/signin']);
  }

  onSignup() {
    this.router.navigate(['/signup']);
  }

  onNavigateExpiredProduct() {
    this.router.navigate(['/expired-product']);
  }

  onmouseMenu(event) {
    this.wrapper.nativeElement.classList.toggle('gn-open-part');
 }


 onmouseWrapper(event) {
   this.wrapper.nativeElement.classList.toggle('gn-open-all');

 }

 onClickMenu(event) {
  this.wrapper.nativeElement.classList.remove('gn-open-all');
 }

 onAllProduct() {
  this.router.navigate(['/all-products']);
}

onNewProduct() {
  this.router.navigate(['/new-product']);
}

onExpiredProduct() {
  this.router.navigate(['/expired-product']);
}

onShopCart() {
  this.router.navigate(['/shop-process']);
}

openSidebar() {
  this.show_hide_sidebar =  this.show_hide_sidebar ? false : true;
}

onSearch() {
  this.globalService.serachActive.next(true);
}

onChangePictur() {
  this.router.navigate(['/upload-photo']);
}
}

