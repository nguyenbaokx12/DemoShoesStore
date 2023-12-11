import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/model/cart-payment/cart';
import { QuantityProduct } from 'src/app/model/product/sale/quantityproduct';
import { SaleProduct } from 'src/app/model/product/sale/saleproduct';
import { SizeProduct } from 'src/app/model/product/sale/sizeproduct';
import { CartService } from 'src/app/service/cart-payment/cart.service';
import { QuantitySaleService } from 'src/app/service/sale-service/quantity-sale-service.service';
import { SaleproductService } from 'src/app/service/sale-service/saleproduct.service';
import { SizeproductService } from 'src/app/service/sale-service/sizeproduct.service';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.css']
})
export class AddCartComponent implements OnInit {
  cartList: Cart[] = [];
  saleList: SaleProduct[] = [];
  sizeList: SizeProduct[] = [];
  quantityList: QuantityProduct[] = [];
  carts: any;
  users: any;

  constructor(
    private cartService: CartService,
    private saleService: SaleproductService,
    private sizeService: SizeproductService,
    private quantityService: QuantitySaleService,
    private active: ActivatedRoute,
    private router: Router,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {

    this.active.paramMap.subscribe(data => {
      this.users = data.get('id')
    })

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

    this.calculateTotal();
  }


  delete(item) {
    this.carts = item
    this.cartService.DeleteCart(this.carts.id).subscribe(data => {
      this.ngOnInit()
    })
  }

  decreaseNumberOrders(item: Cart) {
    if (item.numberOrders > 1) {
      item.numberOrders -= 1;
      this.carts = item
      this.cartService.updateCart(this.carts.id, this.carts).subscribe(data => {
        this.ngOnInit();
      })
    }

  }

  increaseNumberOrders(item: Cart) {
    item.numberOrders += 1;
    this.carts = item
    this.cartService.updateCart(this.carts.id, this.carts).subscribe(data => {
      this.ngOnInit();
    })
  }


  calculateTotal() {
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

  QuantityOrder() {
    let totalQuantity = 0;
    for (let item of this.cartList) {
      if (this.users === item.userId) {
        totalQuantity = totalQuantity + 1;
      }
    }
    return totalQuantity;
  }

  ToPayment() {
    if (this.calculateTotal() == 0){
      this.toast.error('Bạn chưa có đơn hàng nào cần thanh toán')
    } else{
      this.router.navigate(['/payment',this.users], {
      });
    }
  }


}


