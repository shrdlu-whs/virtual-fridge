import { IApiCategory } from "../interfaces/api/api-category.interface";
import axios, { CancelToken } from "axios";
import axiosRetry from "axios-retry";

axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay});

const categoriesPath = "/api/categories";

const getCategories = (token: CancelToken) => {
  return axios.get<IApiCategory[]>(categoriesPath, { cancelToken: token });
};

// const getProduct = (id: number, token: CancelToken) => {
//   return axios.get<IApiProduct>(`${productsPath}/${id}`, { cancelToken: token });
// };

// const addProduct = (product: IApiProduct) => {
//   return axios.post<IApiProduct>(productsPath, product);
// };

// const updateProduct = (product: IApiProduct) => {
//   return axios.put<void>(productsPath, product);
// };

// const deleteProduct = (id: number) => {
//   return axios.delete<void>(`${productsPath}/${id}`);
// };

export { getCategories }; //, getProduct, addProduct, updateProduct, deleteProduct };
