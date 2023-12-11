import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SaleProduct } from 'src/app/model/product/sale/saleproduct';

@Injectable({
  providedIn: 'root'
})
export class SaleproductService {
  saleproduct: SaleProduct[] = [];
  private url = "http://localhost:3000/saleproduct";

  constructor(private http: HttpClient) { }

  getAllSale(): Observable<SaleProduct[]> {
    return this.http.get<SaleProduct[]>(this.url)
  };

  findById(idSaleProduct: string | null): Observable<SaleProduct>{
    return this.http.get<SaleProduct>(this.url + '/' + idSaleProduct)
  } 
}
