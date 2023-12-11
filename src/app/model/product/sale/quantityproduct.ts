import { SaleProduct } from "./saleproduct";
import { SizeProduct } from "./sizeproduct";

export interface QuantityProduct {
    id?: number;
    idSize?: SizeProduct;
    idProduct?: SaleProduct;
    quantity?: number;
}