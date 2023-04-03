import React from "react";
import { INutritionValue, IProductItem, IProduct } from "../interfaces/froms/addProductForm.interface";
import { RootStore } from "../store/rootStore";
import { Provider } from "mobx-react"; 
import { render, screen } from '@testing-library/react'; 
import Product from '../components/products-content/productCardsContainer'
const products = require('../components/products-content/productCardsContainer')

test('Products exists', () => {
    expect(typeof products).toEqual('object');
});

test('test object of product', () => { 
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
  const product: IProduct = {
    name: "Schokolade",
    iconPath: "",
    category: [],
    totalQuantity: 1,
    minQuantity: -1,
    unit: "",
    items: [],
    nutritionalValue: nutritionValue}
; 
      expect(product).toMatchSnapshot();
});
test('render products', () => {
    const rootStore: RootStore = new RootStore();
    render(
        <Provider {...rootStore}>
            <Product />
         </Provider>);
    const button=screen.getByRole('button', {name: 'add'})
    const input=screen.getByLabelText('search');
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
});
