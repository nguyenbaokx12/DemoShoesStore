import { Component, OnInit } from '@angular/core';
import { SaleProduct } from '../../../model/product/sale/saleproduct';
import { SizeProduct } from '../../../model/product/sale/sizeproduct';
import { SaleproductService } from '../../../service/sale-service/saleproduct.service';
import { SizeproductService } from '../../../service/sale-service/sizeproduct.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sale-product',
  templateUrl: './sale-product.component.html',
  styleUrls: ['./sale-product.component.css']
})
export class SaleProductComponent implements OnInit {
  saleProducts: SaleProduct[] = [];
  sizeList: SizeProduct[] = [];
  userId: any
  p = 1;

  constructor(
    private saleProductSale: SaleproductService,
    private sizeProductService: SizeproductService,
    private active: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getAllSale();
    this.getAllSize();

    this.active.params.subscribe(params => {
      this.userId = params['id'];
    })
  
  }

  getAllSale() {
    this.saleProductSale.getAllSale().subscribe(data => {
      this.saleProducts = data
    })
  }

  getAllSize() {
    this.sizeProductService.getAllSize().subscribe((data) => {
      this.sizeList = data
    })
  }

}
