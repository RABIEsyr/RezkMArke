import { PaymentRouting } from './payment-routing.module';
import { NgModule } from '@angular/core';
import { PaymentComponent } from './payment/payment.component';
import { PaymentService } from './payment.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PaymentRouting
    ],
   
    providers: [PaymentService],
    exports: []
})
export class PaymentModule {

}
