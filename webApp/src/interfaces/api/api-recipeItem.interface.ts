import { IApiProduct } from "./api-product.interface"

export interface IApiRecipeItem {
    id?: number;
    quantity: number;
    product: IApiProduct;
}