import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SizeProduct } from 'src/app/model/product/sale/sizeproduct';

@Injectable({
  providedIn: 'root'
})
export class SizeproductService {
  sizeproduct: SizeProduct[] = [];
  private url = "http://localhost:3000/sizeproduct";

  constructor(
    private http: HttpClient
  ) { }

  getAllSize(): Observable<SizeProduct[]> {
    return this.http.get<SizeProduct[]>(this.url);
  }

  findById(idSizeProduct: string): Observable<SizeProduct> {
    return this.http.get<SizeProduct>(this.url + '/' + idSizeProduct);
  }
}
