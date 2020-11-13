import { ShoppingService } from 'src/app/services/shopping.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
orders = new Array<any>();
finalArr = new Array<any>();

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
    this.shoppingService.getHistory().subscribe(result => {
     if (result['success']) {
    //   console.log(result['order']);
       this.orders = result['order'];
       console.log('orders: ', this.orders);
       for (let i = 0; i < this.orders[i]['products'].length; i++) {
        for (let j = 0; j < this.orders[i]['products'].length; j++) {
          console.log('finalArr: ', this.orders[i]['products'][j]);
      }
      }
    }
  });
  }

}
