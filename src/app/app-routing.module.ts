import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/guard/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PaymentProductComponent } from './cart/payment-product/payment-product.component';
import { SaleDetailComponent } from './product/sale/sale-detail/sale-detail.component';
import { SaleProductComponent } from './product/sale/sale-product/sale-product.component';
import { AddCartComponent } from './cart/add-cart/add-cart.component';
import { OrderManagementComponent } from './admin/order-management/order-management.component';
import { InfoAcountComponent } from './admin/info-acount/info-acount.component';
import { ResumeComponent } from './admin/resume/resume.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home/:id', component: SaleProductComponent, canActivate: [AuthGuard] },
  { path: 'sale/:id1/:id', component: SaleDetailComponent, canActivate: [AuthGuard] },
  { path: 'payment/:id', component: PaymentProductComponent, canActivate: [AuthGuard] },
  { path: 'account/:id', component: InfoAcountComponent, canActivate: [AuthGuard] },
  { path: 'order/:id', component: OrderManagementComponent, canActivate: [AuthGuard] },
  { path: 'cart/:id', component: AddCartComponent, canActivate: [AuthGuard] },
  { path: 'resume/:id', component: ResumeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
