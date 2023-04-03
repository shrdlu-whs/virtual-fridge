import { IApiRecipe } from "../interfaces/api/api-recipe.interface";
import axios, { CancelToken, CancelTokenSource } from "axios";
import axiosRetry from "axios-retry";

axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay});

const recipePath = "/api/recipes";

const getRecipes = (token: CancelToken) => {
  return axios.get<IApiRecipe[]>(recipePath, { cancelToken: token });
};

const getRecipe = (id: number, token: CancelToken)=> {
  return axios.get<IApiRecipe>(`${recipePath}/${id}`, { cancelToken: token });
};

const addRecipe = (recipe: IApiRecipe) => {
  return axios.post<IApiRecipe>(recipePath, recipe);
};

const updateRecipe = (recipe: IApiRecipe) => {
  return axios.put<void>(recipePath, recipe);
};

const deleteRecipe = (id: number) => {
  return axios.delete<void>(`${recipePath}/${id}`);
};

export { getRecipes, getRecipe, addRecipe, updateRecipe, deleteRecipe };
