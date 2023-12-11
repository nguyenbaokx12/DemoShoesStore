import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HistoryPayment } from 'src/app/model/cart-payment/history';
import { InfoPayment } from 'src/app/model/cart-payment/infopayment';
import { QuantityProduct } from 'src/app/model/product/sale/quantityproduct';
import { SaleProduct } from 'src/app/model/product/sale/saleproduct';
import { SizeProduct } from 'src/app/model/product/sale/sizeproduct';
import { User } from 'src/app/model/user/user';
import { AuthService } from 'src/app/service/auth-service/auth.service';
import { HistoryService } from 'src/app/service/cart-payment/history.service';
import { PaymentService } from 'src/app/service/cart-payment/payment.service';
import { QuantitySaleService } from 'src/app/service/sale-service/quantity-sale-service.service';
import { SaleproductService } from 'src/app/service/sale-service/saleproduct.service';
import { SizeproductService } from 'src/app/service/sale-service/sizeproduct.service';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {
  infoList: InfoPayment[] = [];
  historyList: HistoryPayment[] = []
  sizeProductList: SizeProduct[] = [];
  quantityList: QuantityProduct[] = [];
  saleList: SaleProduct[] = [];
  userList: User[] = [];
  users: any;
  inFoId: any;
  inFoIdD: any;
  InfoForm: FormGroup
  InfoValue: InfoPayment;


  constructor(
    private infoS: PaymentService,
    private hisS: HistoryService,
    private authS: AuthService,
    private sizeS: SizeproductService,
    private quanS: QuantitySaleService,
    private saleS: SaleproductService,
    private active: ActivatedRoute,
    private builder: FormBuilder,

  ) {
    this.InfoForm = this.builder.group({
      userId: [''],
      phone: [''],
      address: [''],
      note: [''],
      datePayment: [''],
      status: ['', Validators.required],
      id: ['']
    });
   }

  ngOnInit(): void {
    this.infoS.GetAll().subscribe(data => {
      this.infoList = data
    })

    this.hisS.GetAll().subscribe(data => {
      this.historyList = data
    })

    this.sizeS.getAllSize().subscribe(data => {
      this.sizeProductList = data
    })

    this.quanS.getAllQuantitySale().subscribe(data => {
      this.quantityList = data
    })

    this.saleS.getAllSale().subscribe(data => {
      this.saleList = data
    })

    this.authS.Getall().subscribe(data => {
      this.userList = data
    })

    this.active.params.subscribe(params => {
      this.users = params['id'];
    })
  }

  GetIdInfo(id) {
    this.inFoId = id
    console.log(this.inFoId)
  }

  Total(id) {
    this.inFoIdD = id
    let total = 0;
    for (let h of this.historyList) {
      if (h.infoId === this.inFoIdD) {
        for (let q of this.quantityList) {
          if (h.quantityId == q.id) {
            for (let p of this.saleList) {
              if (q.idProduct == p.id) {
                total += p.priceSale * h.numberOrders;
              }
            }
          }
        }
      }
    }
    return total;
  }

  FormatStatus(status){
    if (status == 0){
      return "o Chờ xác nhận"
    }else if (status == 1){
      return "o Đã xác nhận"
    } else{
      return "o Hủy bỏ"
    }
  }

  FormatStatusColor(status: number): string {
    if (status == 0) {
      return 'rgb(55,125,246)'; 
    } else if (status == 1) {
      return 'rgb(72,157,114)'; 
    } else {
      return 'red'; 
    }
  }

  DeleteI(){
    this.infoS.DeleteInfo(this.inFoId).subscribe(data =>{
      this.ngOnInit()
    })
  }

  OpenModal(id){
    this.infoS.FindById(id).subscribe((data: any) =>{
      this.InfoValue =data
      this.InfoForm.patchValue({
        id: data.id,
        userId: data.userId,
        phone: data.phone,
        address: data.address,
        note: data.note,
        datePayment: data.datePayment,
        status: data.status,
      })
    })
  }

  Edit(){
    this.infoS.UpdateInfo(this.InfoForm.value.id, this.InfoForm.value).subscribe(res =>{
      this.ngOnInit()
    })
  }

}
