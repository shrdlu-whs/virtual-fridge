import { IApiProduct } from './api-product.interface'

export interface IApiShoppinglistItem {
    id?: number;
    product: IApiProduct;
    quantity: number;
    isAcquired: boolean;
}

export interface IAddShoppinglistItem {
    product: IApiProduct;
    quantity: number;
    isAcquired: boolean;
}
export interface IUpdateShoppinglistItem {
    id?: number;
    product: IApiProduct;
    quantity: number;
    isAcquired: boolean;
}