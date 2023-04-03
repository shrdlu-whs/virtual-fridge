/* eslint-disable no-debugger */
import { makeObservable, action, observable, runInAction } from "mobx";
import { RootStore } from "./rootStore";
import { persist } from "mobx-persist";
import { getRecipe, getRecipes, addRecipe, updateRecipe, deleteRecipe } from "../services/recipe2.service";
import { IApiRecipe } from "../interfaces/api/api-recipe.interface";
import { IApiItem } from "../interfaces/api/api-item.interface";
import { IApiRecipeItem } from "../interfaces/api/api-recipeItem.interface";
import { IRecipe } from "../interfaces/froms/addRecipeForm.interface";
import { IRecipeItem } from "../interfaces/froms/addRecipeForm.interface";
export class RecipeStore {
  @observable activeRecipe: IApiRecipe | undefined = undefined;
  @observable recipes: IApiRecipe[] = [];

  //#region Add recipe form data props
  @observable recipeItems: IRecipeItem[] = [];
  @observable addRecipeFormData: IRecipe = {
    name: "",
    shortDescription: "",
    instructions: "",
    hyperlink: "https://www.someimage.net",
    expectedTime: "00:05:00",
    difficulty: "easy",
    recipeItems: this.recipeItems,
  };
  //#endregion

  constructor(private rootStore: RootStore) {
    makeObservable(this);
  }

  async getRecipes() {
    try {
      const recipes = (await getRecipes()).recipes;
      this.setRecipes(recipes);
    } catch (error) {
      if (error.message) {
        this.rootStore.notificationStore.createNotification("get_recipes", "error", true, error);
      }
    }
  }

  async getRecipe(id: number) {
    try {
      const recipe = (await getRecipe(id)).recipe;
      this.setActiveRecipe(recipe);
      this.updateCachedRecipes(recipe);
    } catch (error) {
      if (error.message) {
        this.rootStore.notificationStore.createNotification("get_recipe", "error", true, error);
      }
    }
  }

  async addRecipe(recipe: IApiRecipe) {
    try {
      recipe = (await addRecipe(recipe)).createRecipe;
      this.setRecipes(this.recipes.concat([recipe]));
    } catch (error) {
      this.rootStore.notificationStore.createNotification("add_recipe", "error", true, error);
    }
  }

  async updateRecipe(recipe: IApiRecipe) {
    try {
      await updateRecipe(recipe);
      if (recipe.id) this.updateCachedRecipes(recipe);
    } catch (error) {
      this.rootStore.notificationStore.createNotification("update_recipe", "error", true, error);
    }
  }

  async deleteRecipe(id: number) {
    try {
      await deleteRecipe(id);
      const index = this.recipes.findIndex((product) => product.id === id);
      if (index !== -1) {
        runInAction(() => {
          this.recipes.splice(index, 1);
        });
      }
    } catch (error) {
      this.rootStore.notificationStore.createNotification("delete_recipe", "error", true, error);
    }
  }

  updateCachedRecipes(recipe: IApiRecipe) {
    // Update cached products
    const index = this.recipes.findIndex((sRecipe) => sRecipe.id === recipe.id);
    if (index !== -1) {
      this.recipes.splice(index, 1, recipe);
    } else {
      this.recipes.push(recipe);
    }
  }

  @action
  setActiveRecipe(recipe: IApiRecipe) {
    this.activeRecipe = recipe;
  }

  @action
  setRecipes(recipes: IApiRecipe[]) {
    this.recipes = recipes;
  }

  @action
  setRecipeItems(items: IRecipeItem[]) {
    this.recipeItems = items;
  }

  @action
  setAddRecipeFormData(data: IRecipe) {
    this.addRecipeFormData = data;
  }

  @action
  resetAddRecipeFormData = () => {
    this.setRecipeItems([]);
    this.setAddRecipeFormData({
      name: "",
      shortDescription: "",
      instructions: "",
      hyperlink: "https://www.someimage.net",
      expectedTime: "00:05:00",
      difficulty: "easy",
      recipeItems: this.recipeItems,
    });
  };
}
