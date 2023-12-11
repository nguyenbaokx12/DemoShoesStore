import { DatePipe } from '@angular/common';
import { QuantityProduct } from '../product/sale/quantityproduct';
import { User } from '../user/user';

export interface Cart{
    id?: number;
    userId?: User;
    quantityId?: QuantityProduct;
    numberOrders?: number;
}