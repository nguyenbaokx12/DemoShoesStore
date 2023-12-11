import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SaleProduct } from 'src/app/model/product/sale/saleproduct';
import { SaleproductService } from 'src/app/service/sale-service/saleproduct.service';
import { SizeProduct } from '../../model/product/sale/sizeproduct';
import { QuantityProduct } from '../../model/product/sale/quantityproduct';
import { QuantitySaleService } from '../../service/sale-service/quantity-sale-service.service';
import { SizeproductService } from '../../service/sale-service/sizeproduct.service';
import { CartService } from 'src/app/service/cart-payment/cart.service';
import { Cart } from 'src/app/model/cart-payment/cart';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth-service/auth.service';
import { PaymentService } from '../../service/cart-payment/payment.service';
import { User } from 'src/app/model/user/user';
import { HistoryService } from 'src/app/service/cart-payment/history.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-product',
  templateUrl: './payment-product.component.html',
  styleUrls: ['./payment-product.component.css']
})
export class PaymentProductComponent implements OnInit {
  cartList: Cart[] = [];
  saleList: SaleProduct[] = [];
  sizeList: SizeProduct[] = [];
  quantityList: QuantityProduct[] = [];
  users: any;
  quantitys: any
  info: User;
  information: FormGroup;
  addInfo: FormGroup;
  today: any = Date.now();

  constructor(
    private cartService: CartService,
    private saleService: SaleproductService,
    private sizeService: SizeproductService,
    private authService: AuthService,
    private hisService: HistoryService,
    private paymentService: PaymentService,
    private quantityService: QuantitySaleService,
    private active: ActivatedRoute,
    private builder: FormBuilder,
    private router: Router,
    private toast: ToastrService
  ) {
    this.information = this.builder.group({
      id: [''],
      firstname: [''],
      name: [''],
      password: [''],
      email: [''],
      role: ['', Validators.required],
      isactive: []
    })
  }

  ngOnInit(): void {

    this.cartService.Getall().subscribe(data => {
      this.cartList = data;
    })

    this.quantityService.getAllQuantitySale().subscribe(data => {
      this.quantityList = data;
    })

    this.saleService.getAllSale().subscribe(data => {
      this.saleList = data;
    })

    this.sizeService.getAllSize().subscribe(data => {
      this.sizeList = data;
    })

    this.active.paramMap.subscribe(data => {
      this.users = data.get('id')
      this.authService.GetIdRole(this.users).subscribe((res: any) => {
        this.information.patchValue({
          id: res.id,
          firstname: res.firstname,
          name: res.name,
          password: res.password,
          email: res.email,
          role: res.role,
          isactive: res.isactive,
        })
      })
    })

    this.addInfo = new FormGroup({
      userId: new FormControl(this.users, [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      note: new FormControl('', [Validators.required]),
      datePayment: new FormControl(this.today, [Validators.required]),
      status: new FormControl('0', [Validators.required]),
    })
  }

  total() {
    let total = 0;
    for (let item of this.cartList) {
      if (item.userId === this.users) {
        for (let p of this.quantityList) {
          if (item.quantityId == p.id) {
            for (let sale of this.saleList) {
              for (let size of this.sizeList) {
                if (p.idProduct == sale.id && p.idSize == size.idSize) {
                  total += sale.priceSale * item.numberOrders;
                }
              }
            }
          }
        }
      }
    }
    return total;
  }

  addNewInfo() {
    if (this.addInfo.invalid || this.information.invalid) {
      this.toast.error('Vui lòng nhập thông tin')
    } else if (this.total() == 0) {
      this.toast.error('Bạn chưa có đơn hàng nào cần thanh toán')
    } else {
      this.paymentService.addInfo(this.addInfo.value).subscribe(data => {
        for (let items of this.cartList) {
          if (items.userId == this.users) {
            for (let q of this.quantityList) {
              if (q.id == items.quantityId) {
                q.quantity = q.quantity - items.numberOrders
                if (q.quantity < 0) {
                  this.toast.error('Đơn hàng này hiện tại không đủ trong kho');
                } else {
                  this.quantitys = q
                  this.quantityService.UpdateQuantity(q.id, this.quantitys).subscribe(data =>{
                    
                  })
                }
              }
            }
            const historyItem = {
              userId: items.userId,
              quantityId: items.quantityId,
              numberOrders: items.numberOrders,
              infoId: data.id,
            };
            this.hisService.AddOrders(historyItem).subscribe(data => {
            });
            this.cartService.DeleteCart(items.id).subscribe(data => {
            })
          }
        }
        this.updateInfo();
        this.router.navigate(['/home', this.users], {
        })
        this.toast.success("Đặt hàng thành công")
      });
    }
  }

  updateInfo() {
    this.authService.updateuser(this.users, this.information.value).subscribe(res => {
    })
  }

}

