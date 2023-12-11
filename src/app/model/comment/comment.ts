import { SaleProduct } from "../product/sale/saleproduct";
import { User } from "../user/user";

export interface Comment{
    id?: number;
    productId?: SaleProduct;
    userId?: User;
    vote?: number;
    dateTime?: string;
    content?: string;
}