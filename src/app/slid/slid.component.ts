import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { trigger, state, style, transition, animate, group } from '@angular/animations';

@Component({
  selector: 'app-slid',
  templateUrl: './slid.component.html',
  styleUrls: ['./slid.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('divState', [
      state('in', style({
        width: 120,
        transform: 'translateX(0)', opacity: 1
      })),
      transition('void => *', [
        style({ width: 10, transform: 'translateX(50px)', opacity: 0 }),
        group([
          animate('0.3s 0.1s ease', style({
            transform: 'translateX(0)',
            width: 120,
            'background-color': 'white'
          })),
          animate('0.3s ease', style({
            opacity: 1
          }))
        ])
      ]),
      transition('* => void', [
        group([
          animate('0.3s ease', style({
            transform: 'translateX(50px)',
            width: 10
          })),
          animate('0.3s 0.2s ease', style({
            opacity: 0
          }))
        ])
      ])
    ]),
  ]
})
export class SlidComponent implements OnInit {
  currentState = 'void';
  isAdmin = false;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userService.openSlide.subscribe( p => {
      this.currentState  === 'void' ? this.currentState = 'normal' : this.currentState = 'normal';
    });

   this.isAdmin = this.userService.isAdmin();
  }

  onNewProduct() {
    this.userService.openSlide.next(false);
    this.router.navigate(['/new-product']);
  }


  onAllProduct() {
    this.userService.openSlide.next(false);
    this.router.navigate(['/all-products']);
  }


  onExpiredProduct() {
    this.userService.openSlide.next(false);
    this.router.navigate(['/expired-product']);
  }


  onLogout() {
    this.userService.openSlide.next(false);
    localStorage.removeItem('token');
  }

  onShopCart() {
    this.userService.openSlide.next(false);
    this.router.navigate(['/shop-process']);
  }
}
