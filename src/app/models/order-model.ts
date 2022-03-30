import { IProduct } from "./product-model";

export interface IOrder {
    userId: number | undefined;
    cart: IProduct[];
}