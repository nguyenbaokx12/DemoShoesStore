import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuantityProduct } from 'src/app/model/product/sale/quantityproduct';

@Injectable({
  providedIn: 'root'
})
export class QuantitySaleService {
  quantitySale: QuantityProduct[] = [];
  private url =  "http://localhost:3000/quantityproduct";

  constructor(private http: HttpClient) { }

  getAllQuantitySale(): Observable<QuantityProduct[]> {
    return this.http.get<QuantityProduct[]>(this.url)
  }

  findById(idQuantitySale: string | null): Observable<QuantityProduct>{
    return this.http.get<QuantityProduct>(this.url + '/' + idQuantitySale)
  } 

  UpdateQuantity(id: any, quantity: any): Observable<QuantityProduct>{
    return this.http.put<QuantityProduct>(this.url + '/' + id,quantity)
  }
}
