import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from './home/navigation/navigation.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AddCartComponent } from './cart/add-cart/add-cart.component';
import { PaymentProductComponent } from './cart/payment-product/payment-product.component';
import { CarouselComponent } from './home/carousel/carousel.component';
import { FooterComponent } from './home/footer/footer.component';
import { ListbrandComponent } from './home/listbrand/listbrand.component';
import { SlideComponent } from './home/slide/slide.component';
import { SaleDetailComponent } from './product/sale/sale-detail/sale-detail.component';
import { SaleProductComponent } from './product/sale/sale-product/sale-product.component';
import { CommentComponent } from './product/comment/comment.component';
import { OrderManagementComponent } from './admin/order-management/order-management.component';
import { InfoAcountComponent } from './admin/info-acount/info-acount.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ResumeComponent } from './admin/resume/resume.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SlideComponent,
    CarouselComponent,
    FooterComponent,
    ListbrandComponent,
    RegisterComponent,
    LoginComponent,
    SaleProductComponent,
    SaleDetailComponent,
    PaymentProductComponent,
    AddCartComponent,
    CommentComponent,
    OrderManagementComponent,
    InfoAcountComponent,
    ResumeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
