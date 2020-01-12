import { ChatService } from './services/chat.service';
import { AuthAdminGuardService } from './services/auth-admin-guard.services';
import { AuthGuardService } from './services/auth-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';


import { FileSelectDirective, FileUploadModule } from 'ng2-file-upload';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UserService } from './services/user.service';
import { LoginComponent } from './register/login/login.component';
import { SignupComponent } from './register/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {
  MatAutocompleteModule,
   MatButtonModule, MatButtonToggleModule,
   MatCardModule, MatCheckboxModule, MatChipsModule,
   MatDatepickerModule, MatDialogModule,
   MatExpansionModule,
   MatFormFieldModule,
   MatGridListModule,
   MatIconModule, MatInputModule,
   MatListModule, MatMenuModule, MatNativeDateModule,
   MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule,
   MatRadioModule, MatRippleModule,
   MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule,
   MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule,
} from '@angular/material';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { HomeComponent } from './home/home.component';
import { NewProductComponent } from './products/new-product/new-product.component';
import { FooterComponent } from './footer/footer.component';
import { SlidComponent } from './slid/slid.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { ScrollDirective } from './directives/scroll.directive';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ExpiredProductComponent } from './notifications/expired-product.component';
import { NotificationComponent } from './notifications/exoire-in/notification.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { AllProductsComponent } from './products/all-products/all-products.component';
import { AnimateRezkDirective } from './directives/animate-rezk.directive';
import { ProductService } from './services/product.service';
import { ShopCartComponent } from './cart/shop-cart/shop-cart.component';
import { StepsComponent } from './cart/steps/steps.component';
import { ShippingComponent } from './cart/shipping/shipping.component';
//import { PaymentModule } from './payment/payment.module';
import { PaymentComponent } from './payment/payment/payment.component';
import { CustomProductCardComponent } from './products/custom-product-card/custom-product-card.component';
 import { GlobalService } from './services/global.service';
import { ProfilePictrueComponent } from './register/signup/profile-pictrue/profile-pictrue.component';
import { MessageComponent } from './message/message.component';

const socketConfig: SocketIoConfig = {url: 'http://localhost:3000', options: {}};

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'left',
      distance: 12
    },
    vertical: {
      position: 'top',
      distance: 12,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    NewProductComponent,
    FooterComponent,
    SlidComponent,
    ProductCardComponent,
    ScrollDirective,
    ExpiredProductComponent,
    NotificationComponent,
    EditProductComponent,
    AllProductsComponent,
    AnimateRezkDirective,
    ShopCartComponent,
    StepsComponent,
    ShippingComponent,
    PaymentComponent,
    CustomProductCardComponent,
    //FileSelectDirective,
    ProfilePictrueComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    MDBBootstrapModule.forRoot(),
   
    MatAutocompleteModule,
    MatButtonModule, MatButtonToggleModule,
    MatCardModule, MatCheckboxModule, MatChipsModule,
    MatDatepickerModule, MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule, MatInputModule,
    MatListModule, MatMenuModule, MatNativeDateModule,
    MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule,
    MatRadioModule, MatRippleModule,
    MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule,
    MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, ScrollingModule, DragDropModule,
    NotifierModule.withConfig(customNotifierOptions),
    SocketIoModule.forRoot(socketConfig),
    FileUploadModule
  ],
  providers: [
    UserService,
    ProductService,
    AuthGuardService,
    AuthAdminGuardService,
    GlobalService,
    ChatService
  ],
  entryComponents: [ProductCardComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
