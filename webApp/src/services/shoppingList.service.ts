import { IApiShoppingList, IUpdateShoppingList } from "../interfaces/api/api-shoppinglist.interface";
import { IAddShoppingList } from "../interfaces/api/api-shoppinglist.interface";
import axios, { CancelToken } from "axios";
import axiosRetry from "axios-retry";

axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay});

const shoppingListsPath = "/api/shoppingLists";

const getShoppingLists = (token: CancelToken) => {
  return axios.get<IApiShoppingList[]>(shoppingListsPath, { cancelToken: token });
};

const getShoppingList = (id: number, token: CancelToken) => {
  return axios.get<IApiShoppingList>(`${shoppingListsPath}/${id}`, { cancelToken: token });
};

const addShoppingList = (shoppingList: IAddShoppingList) => {
  return axios.post<IAddShoppingList>(shoppingListsPath, shoppingList);
};

const updateShoppingList = (shoppingList: IUpdateShoppingList) => {
  return axios.put<void>(shoppingListsPath, shoppingList);
};

const deleteShoppingList = (id: number): Promise<void> => {
  return axios.delete(`${shoppingListsPath}/${id}`);

};

export { getShoppingLists, getShoppingList, addShoppingList, updateShoppingList, deleteShoppingList };
