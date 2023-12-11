import { SizeNike } from "./sizenike";

export interface NikeProduct{
    idNike?: number;
    nameNike?: string;
    img?: string;
    imgSub?: string;
    price?: number;
    describe?: string;
    sizeProduct?: SizeNike;
}