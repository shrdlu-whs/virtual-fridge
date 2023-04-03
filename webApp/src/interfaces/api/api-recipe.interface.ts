import { IApiItem } from "./api-item.interface";
import { IApiRecipeItem } from "./api-recipeItem.interface";

export interface IApiRecipe {
  id?: number;
  name: string;
  shortDescription: string;
  instructions: string;
  iconPath: string;
  recipeItems: IApiRecipeItem[];
  hyperlink: string;
  favorite: boolean;
  expectedTime: number;
  difficulty: Difficulty;
  // created?: Date;
}

export type Difficulty = "easy" | "intermediate" | "difficult"