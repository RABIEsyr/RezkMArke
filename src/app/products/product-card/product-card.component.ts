import { Component, OnInit, Input, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class ProductCardComponent {
  @Input() name;
  @Input() price;
  @Input() imageUrl;
  @Input() quantity;

  constructor(public dialogRef: MatDialogRef<ProductCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.name = data.name;
      this.price = data.price;
      this.imageUrl = data.imageUrl;
      this.quantity = data.quantity;
    }
}
