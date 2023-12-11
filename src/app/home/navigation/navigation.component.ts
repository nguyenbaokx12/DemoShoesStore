import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/model/cart-payment/cart';
import { CartService } from 'src/app/service/cart-payment/cart.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  isadmin = false;
  isMenuVisible = false;
  users: any;
  cartList: Cart[] = [];


  constructor(
    private cartService: CartService,
    private renderer: Renderer2,
    private route: Router,
    private active: ActivatedRoute,
  ) {
    let role = sessionStorage.getItem('role');
    if (role == 'admin') {
      this.isadmin = true;
    }
  }

  ngOnInit(): void {
    const script = this.renderer.createElement('script');
    script.src = 'assets/js/index2.js';
    this.renderer.appendChild(document.body, script);

    this.active.params.subscribe(params => {
      this.users = params['id'];
    })

    this.cartService.Getall().subscribe(data =>{
      this.cartList = data
    })
  }

  ngDoCheck(): void {
    let currentroute = this.route.url;
    let role = sessionStorage.getItem('role');
    if (currentroute == '/login' || currentroute == '/register') {
      this.isMenuVisible = false
    } else {
      this.isMenuVisible = true
    }

    if (role == 'admin') {
      this.isadmin = true;
    } else {
      this.isadmin = false;
    }
  }

  totalNumber() {
    let totalQuantity = 0;
    for (let item of this.cartList) {
      if (this.users === item.userId) {
        totalQuantity = totalQuantity + 1;
      }
    }
    return totalQuantity;
  }

}
