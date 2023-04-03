import { IApiProduct } from "./api-product.interface";

export interface IApiItem {
    id?: number;
    barcode: string;
    quantity: number;       // 5x 1000ml milk    => take from product if not defined from user
    product?: IApiProduct;    // Missing on IApiProduct - next spoiling item
    expirationDate: Date;
    created: Date;
}