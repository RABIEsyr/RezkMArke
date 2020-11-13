import { ProductService } from './services/product.service';
import { UserService } from './services/user.service';
import { Component, DoCheck, OnInit, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from './services/global.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck {
  title = 'Rezk Market';
  openSlide = false;
  productList: Observable<Object>;
  searchDiv;
  openNewSlide = true;
  public innerWidth: any;

  constructor(private userService: UserService,
     private productService: ProductService,
     private globalService: GlobalService) {}

  ngOnInit() {
  }

  ngDoCheck(): void {
    this.userService.openSlide.subscribe(openClose => {
      this.openSlide = openClose;
    });

     this.productService.searchDivToggle
       .subscribe(bool => this.searchDiv = bool);

       this.productService.productList
    .subscribe(products => this.productList = <Observable<Object>>products);

    this.globalService.openNewSlide.subscribe(bool => {
      this.openNewSlide = bool;
    });

  }

  onClickId(id) {
    console.log(id);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
  this.innerWidth = window.innerWidth;
  this.globalService.windowWidth.next(this.innerWidth);
  console.log(this.innerWidth);
}

}
