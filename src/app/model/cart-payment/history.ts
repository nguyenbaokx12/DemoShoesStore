import { QuantityProduct } from "../product/sale/quantityproduct";
import { User } from "../user/user";
import { InfoPayment } from "./infopayment";

export interface HistoryPayment {
    id: number;
    userId?: User;
    quantityId?: QuantityProduct;
    numberOrders?: number;
    infoId?: InfoPayment;
}