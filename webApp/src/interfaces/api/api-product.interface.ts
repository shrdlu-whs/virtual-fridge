import { IApiCategory } from "./api-category.interface";
import { IApiProductItem } from "./api-productItem.interface";
import { IApiNutritionValues } from "./api-nutritionValues.interface";

export interface IApiProduct {
    id?: number;
    name: string;
    iconPath: string;
    category: IApiCategory[] | null;
    totalQuantity: number;
    minQuantity: number;                    // -1, if not set
    unitDefaultQuantity: number;            // milk always 1000ml  -- Missing
    unit: string;               
    items: IApiProductItem[] | null;             
    nutritionalValue?: IApiNutritionValues; // Always for 100g
}