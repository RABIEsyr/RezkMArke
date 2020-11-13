import { ShoppingService } from './../../services/shopping.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-custom-product-card',
  templateUrl: './custom-product-card.component.html',
  styleUrls: ['./custom-product-card.component.scss']
})
export class CustomProductCardComponent implements OnInit {
    @Input() name;
    @Input() price;
    @Input() imageUrl;
    @Input() quantity;
    @Input() id;
    @Output() buy_id = new EventEmitter<any>();

    @Input() exist;
    @Input() count = 0;
    @Output() plus = new EventEmitter<any>();
    @Output() minus = new EventEmitter<any>();

    currentRate = 5;
    constructor(private userService: UserService, private shopService: ShoppingService) { }

    ngOnInit() {
    }

    onBuy(_id) {
      if (this.userService.isAuthenticated()) {
        this.buy_id.emit(_id);
      } else {
        alert('Please Login');
      }

    }

    onPlus(_id) {
      this.plus.emit(_id);

    }

    onMinus(_id) {
      this.minus.emit(_id);

    }
}
