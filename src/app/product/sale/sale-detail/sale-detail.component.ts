import { DatePipe } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
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
// import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-sale-detail',
  templateUrl: './sale-detail.component.html',
  styleUrls: ['./sale-detail.component.css']
})
export class SaleDetailComponent implements OnInit {
  saleProduct: SaleProduct;
  sizeProductList: SizeProduct[] = [];
  quantityList: QuantityProduct[] = [];
  users: any



  constructor(
    private saleService: SaleproductService,
    private sizeService: SizeproductService,
    private quantityService: QuantitySaleService,
    private cartService: CartService,
    private active: ActivatedRoute,
    private renderer: Renderer2,
    private router: Router,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    const script = this.renderer.createElement('script');
    script.src = 'assets/js/index3.js';
    this.renderer.appendChild(document.body, script);

    this.sizeService.getAllSize().subscribe(data => {
      this.sizeProductList = data;
    })

    this.quantityService.getAllQuantitySale().subscribe(data => {
      this.quantityList = data;
    })

    this.active.paramMap.subscribe((pa: ParamMap) => {
      const activeID = pa.get("id1");
      this.saleService.findById(activeID).subscribe(data => {
        this.saleProduct = data;
      });
    });

    this.active.paramMap.subscribe(data => {
      this.users = data.get('id')
    })



  }


  addCart() {
    const selectedSize = document.querySelector('input[name="size"]:checked') as HTMLInputElement;
    if (!selectedSize) {
      this.toast.error('Vui lòng chọn kích cỡ trước khi mua.')
    } else {
      const cartItem = {
        userId: this.users,
        quantityId: selectedSize.value,
        numberOrders: 1
      };

      this.cartService.addToCart(cartItem).subscribe((cart) => {
        this.router.navigate(['cart', this.users]);
      });
    }
  }

  buyNow() {
    const selectedSize = document.querySelector('input[name="size"]:checked') as HTMLInputElement;
    if (!selectedSize) {
      this.toast.error('Vui lòng chọn kích cỡ trước khi mua.')
    } else {
      const cartItem = {
        userId: this.users,
        quantityId: selectedSize.value,
        numberOrders: 1
      };

      this.cartService.addToCart(cartItem).subscribe((cart) => {
        this.router.navigate(['payment', this.users]);
      });
    }
  }
}
