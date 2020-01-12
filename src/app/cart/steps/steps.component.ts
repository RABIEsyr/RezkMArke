import { ShoppingService } from 'src/app/services/shopping.service';
import { Shipping } from './../shipping/shipping.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {
  products = [];
  shipping: Shipping;
  isLinear = true;
  total = 0;
  nextt = true;
  isComleted1 = false;
  isComleted2 = false;

  constructor(private shopService: ShoppingService) { }

  ngOnInit() {
      this.shopService.totalPrice.subscribe(tP => {
        this.total = tP;
        console.log(980, this.total);
      });
  }

  onFirst(products) {
    this.products = products;
  }

  onShip(ship: Shipping) {
    this.shipping = ship;
    console.log(this.shipping);
  }

  onNext(index) {
    this.isComleted1 = true;
    console.log(888, index);
  }
  
  onStepSelect (event) {
    console.log(event)
  }
}
