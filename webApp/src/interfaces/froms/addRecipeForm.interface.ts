import { IApiRecipeItem } from "../api/api-recipeItem.interface";
import { Difficulty } from "../api/api-recipe.interface"
import { IApiProduct } from "../api/api-product.interface";

export interface IRecipe {
    name: string;
    shortDescription: string;
    instructions: string;
    recipeItems: IRecipeItem[];
    hyperlink: string;
    expectedTime: string;
    difficulty: Difficulty;
}

export interface IRecipeItem {
    uuid: string;
    quantity: number;
    product: IApiProduct;
}
