import { UserService } from './../../services/user.service';
import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShippingComponent implements OnInit {
  @Input() userName;
  @Input() Phone;
  @Output() shipInfo = new EventEmitter<Shipping>();
  @ViewChild('f') form: NgForm;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userName = this.userService.getName();
    console.log(671, this.userName);

     this.form.value.uname = this.userName;
     this.form.value.phone = this.Phone;
  }

  onSubmit(form: NgForm) {
    const name = this.userName;
    const city = form.value.city;
    const street = form.value.street;
    const phone = form.value.phone;

    const shipping = {name, city, street, phone};
    this.shipInfo.emit(shipping);
  }
}

export interface Shipping {
  name: String;
  city: String;
  street: String;
  phone: String;
}
