import { IApiProduct } from "../api/api-product.interface";
export interface IProduct {
    name: string;
    iconPath: string;
    category: ICategory[];
    totalQuantity: number;
    minQuantity: number;
    unit: string;
    items: IProductItem[];
    nutritionalValue: INutritionValue;
}

export interface ICategory{
    id: number;
    name: string;
}

export interface IProductItem {
    uuid: string;
    barcode: string;
    expirationDate: string;
}

export interface INutritionValue{
    nutritionScore: string;   
    calories: number;
    protein: number;
    carbohydrates: number;
    sugar: number;
    fat: number;
    saturatedFat: number;
    fiber: number;
    salt: number;
}
