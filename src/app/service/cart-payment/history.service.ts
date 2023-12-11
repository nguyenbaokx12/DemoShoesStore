import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HistoryPayment } from 'src/app/model/cart-payment/history';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private url = 'http://localhost:3000/history';

  constructor(private http: HttpClient) { }

  AddOrders(his): Observable<HistoryPayment> {
    return this.http.post<HistoryPayment>(this.url, his)
  }

  GetAll(): Observable<HistoryPayment[]>{
    return this.http.get<HistoryPayment[]>(this.url)
  }
}
