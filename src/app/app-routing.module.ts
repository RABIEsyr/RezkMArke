import { MessageComponent } from './message/message.component';
import { ShopCartComponent } from './cart/shop-cart/shop-cart.component';
import { AuthAdminGuardService } from './services/auth-admin-guard.services';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { AllProductsComponent } from './products/all-products/all-products.component';
import {  ExpiredProductComponent } from './notifications/expired-product.component';
import { HomeComponent } from './home/home.component';
import { SlidComponent } from './slid/slid.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { LoginComponent } from './register/login/login.component';
import { SignupComponent } from './register/signup/signup.component';
import { NewProductComponent } from './products/new-product/new-product.component';
import { AuthGuardService } from './services/auth-guard.service';
import { StepsComponent } from './cart/steps/steps.component';
import { ProfilePictrueComponent } from './register/signup/profile-pictrue/profile-pictrue.component';

const routes: Routes = [
  {
    path: 'signin',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'new-product',
    component: NewProductComponent,
    canActivate: [AuthGuardService, AuthAdminGuardService]
  },
  {
    path: 'expired-product',
    component: ExpiredProductComponent,
    canActivate: [AuthGuardService, AuthAdminGuardService]
  },
  {
    path: 'all-products',
    component: AllProductsComponent,
    canActivate: [AuthGuardService, AuthAdminGuardService]
  },
  {
    path: 'edit-product',
    component: EditProductComponent,
  // canActivate: [AuthGuardService, AuthAdminGuardService]
  },
  {
    path: 'shop-process',
    component: StepsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'shop-cart',
    component: ShopCartComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'payment',
    loadChildren: './payment/payment.module#PaymentModule'
  },
  {
    path: 'upload-photo',
    component: ProfilePictrueComponent
  },
  {
    path: 'message',
    component: MessageComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '**',
    component: HomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
