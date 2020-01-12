import { Routes, RouterModule } from '@angular/router';
import { PaymentComponent } from './payment/payment.component';
import { NgModule } from '@angular/core';

const paymentRoutes: Routes = [
    {
        path: '',
        component: PaymentComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(paymentRoutes)
    ],

    exports: [ RouterModule ]
})
export class PaymentRouting {}
