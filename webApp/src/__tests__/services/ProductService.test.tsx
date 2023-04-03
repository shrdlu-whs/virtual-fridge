import * as ProductApi from '../../services/product.service';
import axios, { CancelToken } from 'axios';
import { INutritionValue, IProductItem, IProduct } from "../../interfaces/froms/addProductForm.interface";

const recipeService = require('../../services//recipe.service');

test('forgotPassword exists',() => {
    expect(typeof recipeService).toEqual('object');
})

let token: CancelToken;
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

test('should fetch shoppinglists',async() => {
    const nutritionValue: INutritionValue = {
        calories:450,
        carbohydrates:3,
        fat:150,
        fiber:0,
        nutritionScore:"E",
        protein:4,
        salt:3,
        saturatedFat:4,
        sugar:40
      };
  const products: IProduct[] = [{
    name: "Schokolade",
    iconPath: "",
    category: [],
    totalQuantity: 1,
    minQuantity: -1,
    unit: "",
    items: [],
    nutritionalValue: nutritionValue}
]; 
  const resp = {data: products};
  mockedAxios.get.mockImplementation(() => Promise.resolve(resp));
 const data = await ProductApi.getProducts(token);
 expect(data.data).toEqual(products);
});
