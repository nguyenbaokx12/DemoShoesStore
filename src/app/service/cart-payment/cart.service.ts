import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/model/cart-payment/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private url = "http://localhost:3000/cart";
  carts: Cart[] = [];

  constructor(
    private httpClient: HttpClient
  ) { }

  addToCart(cart): Observable<Cart> {
    return this.httpClient.post<Cart>(this.url, cart)
  }

  Getall(): Observable<Cart[]> {
    return this.httpClient.get<Cart[]>(this.url)
  }


  findByIdid(id): Observable<Cart> {
    return this.httpClient.get<Cart>(this.url + '/' + id);
  }

  updateCart(id: any, cart: any) {
    return this.httpClient.put(this.url + '/' + id, cart);
  }

  DeleteCart(id): Observable<Cart> {
    return this.httpClient.delete<Cart>(this.url + '/' + id);
  }

}
