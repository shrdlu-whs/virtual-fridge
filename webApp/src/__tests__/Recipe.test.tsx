import React from "react";
import IronStock from '../components/iron-stock-content/ironStockContainer'
import { render, screen } from '@testing-library/react'; 
import Recipe from '../components/recipe-content/recipesContainer'
import { RootStore } from "../store/rootStore";
import { Provider } from "mobx-react";
import { IRecipe } from "../interfaces/froms/addRecipeForm.interface";
import { Difficulty, IApiRecipe } from "../interfaces/api/api-recipe.interface";

const recipe = require('../components/recipe-content/recipesContainer') 

test('render about link', () => {
    const rootStore: RootStore = new RootStore();
    render(
        <Provider {...rootStore}>
            <Recipe />
         </Provider>);
})

test('test object of shoppinglist', () => { 
    const recipe: IRecipe = {
        name: "Pommes",
        shortDescription: "",
        instructions: "",
        hyperlink: "https://www.someimage.net",
        expectedTime: "00:05:00",
        difficulty: "easy",
        recipeItems: [],
      }
      expect(recipe).toMatchSnapshot();
});

test('Recipes exists', () => {
    expect(typeof recipe).toEqual('object');
});

test('recipe handle show recipe', () => {
    expect(recipe.handleAddRecipeCancel).toBeUndefined();
});
test('recipe handle show recipe', () => {
    const rootStore: RootStore = new RootStore();
    render(
        <Provider {...rootStore}>
            <Recipe />
         </Provider>);
    const button=screen.getByRole('button', {name: 'add'})
    const input=screen.getByLabelText('search');
});
