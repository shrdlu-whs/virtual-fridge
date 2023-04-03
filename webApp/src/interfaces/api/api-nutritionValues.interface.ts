import { IApiProduct } from "./api-product.interface";
// Always for 100g
export interface IApiNutritionValues {
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
