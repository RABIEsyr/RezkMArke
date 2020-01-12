import { ProductService } from './../services/product.service';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { moveItemInArray, transferArrayItem, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Observable, of } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-notifications',
  templateUrl: './expired-product.component.html',
  styleUrls: ['./expired-product.component.scss']
})
export class ExpiredProductComponent implements OnInit {
  expiredProducts = new Array <Observable<any>>();
  isLogIn: Observable<any>;
  isLoggedIn: Observable<any>;
  closeResult: string;


  constructor(private socket: Socket, private userService: UserService,
     private productService: ProductService,
     private modalService: NgbModal,
     private readonly notification: NotifierService) {}


  ngOnInit() {
    this.productService.notificationBadge.next(this.expiredProducts.length);
    
    this.socket.on('notification', message => {
      this.expiredProducts.push(...(message.map(p => of(p))));
      this.productService.notificationBadge.next(this.expiredProducts.length);

    });
     this.isLogIn = this.userService.isLoggedIn;

  }

  onDeleteProduct(index, id) {
    this.expiredProducts.splice(index, 1);
    this.socket.emit('deleteProduct', id);
    this.productService.notificationBadge.next(this.expiredProducts.length);
    this.notification.notify('success', 'Deleted');

  }

  onDeleteAllProducts(products?) {
    this.socket.emit('deleteAllProducts', this.expiredProducts);
    this.expiredProducts.splice(0);
    this.productService.notificationBadge.next(this.expiredProducts.length);
    this.notification.notify('success', 'All Products Deleted');
  }


  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'Delete click') {
        this.onDeleteAllProducts();
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    let result;
    if (reason === ModalDismissReasons.ESC) {
      result = 'colse';
      return result;
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      result = 'confirmD';
      return result;
    } else {
      return  `with: ${reason}`;
    }
  }

}
