import { IApiProduct } from "../interfaces/api/api-product.interface";
import axios, { CancelToken } from "axios";
import axiosRetry from "axios-retry";

axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay});

const productsPath = "/api/products";

const getProducts = (token: CancelToken) => {
  return axios.get<IApiProduct[]>(productsPath, { cancelToken: token });
};

const getProduct = (id: number, token: CancelToken) => {
  return axios.get<IApiProduct>(`${productsPath}/${id}`, { cancelToken: token });
};

const addProduct = (product: IApiProduct) => {
  return axios.post<IApiProduct>(productsPath, product);
};

const updateProduct = (product: IApiProduct) => {
  return axios.put<void>(productsPath, product);
};

const deleteProduct = (id: number) => {
  return axios.delete<void>(`${productsPath}/${id}`);
};

export { getProducts, getProduct, addProduct, updateProduct, deleteProduct };
