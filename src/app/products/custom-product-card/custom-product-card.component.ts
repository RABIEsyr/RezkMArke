import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
    currentRate = 5;
    constructor() { }

    ngOnInit() {
    }

    onBuy(_id) {
      this.buy_id.emit(_id);
    }
}
