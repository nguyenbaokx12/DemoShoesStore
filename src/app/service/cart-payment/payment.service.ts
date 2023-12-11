import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InfoPayment } from 'src/app/model/cart-payment/infopayment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private url = 'http://localhost:3000/infopayment';

  constructor(private http: HttpClient) { }

  addInfo(info): Observable<InfoPayment> {
    return this.http.post<InfoPayment>(this.url, info)
  }

  GetAll(): Observable<InfoPayment[]> {
    return this.http.get<InfoPayment[]>(this.url)
  }

  FindById(id): Observable<InfoPayment> {
    return this.http.get<InfoPayment>(this.url + '/' + id)
  }

  DeleteInfo(id): Observable<InfoPayment> {
    return this.http.delete<InfoPayment>(this.url + '/' + id)
  }

  UpdateInfo(id, inputdata): Observable<InfoPayment> {
    return this.http.put<InfoPayment>(this.url + '/' + id, inputdata)
  }
}
