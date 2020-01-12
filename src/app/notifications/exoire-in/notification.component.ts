import { ProductService } from './../../services/product.service';
import { Component, OnInit, DoCheck, AfterContentChecked, AfterViewChecked } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

badge: Observable<any>;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.badge = this.productService.notificationBadge;
  }

}
