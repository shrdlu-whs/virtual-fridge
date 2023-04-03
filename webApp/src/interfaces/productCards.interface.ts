import { Interface } from "readline";

export interface IProductCards {
    productName: string,
    quantity: number,
    nutriScore: string,
    expiringDate: string,
    category: Array<String>
}