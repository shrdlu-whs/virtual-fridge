import React from "react";
import IronStock from '../components/iron-stock-content/ironStockContainer'
import { fireEvent, render, screen } from '@testing-library/react'; 
import ShoppingList from '../components/grocerylist-content/shoppinglists/shoppingListsContainer'
import { RootStore } from "../store/rootStore";
import { Provider } from "mobx-react";
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { IAddShoppingList, IApiShoppingList } from './../interfaces/api/api-shoppinglist.interface'
import GroceryList from '../components/grocerylist-content/groceryListContainer'


const shoppinglist = require('../components/grocerylist-content/shoppinglists/shoppingListsContainer')
test ('Register exists', () => {
    expect(typeof shoppinglist).toEqual('object');  
});

test('render about link', () => {
    const rootStore: RootStore = new RootStore();
    const history = createMemoryHistory();
    render(
        <Provider {...rootStore}>
            <ShoppingList />
         </Provider>)
    const addButton = screen.getByRole('button', {name: 'add'});
    const deleteButton = screen.getByRole('button', {name: 'delete'});
    const spanName = screen.getByRole('button', {name: 'Name'});
    const table = screen.getByRole('table', {name: /title\.grocery\_list\_table/i});
    expect(deleteButton).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    fireEvent.click(addButton);
    expect(open).toBeTruthy();
    expect(spanName).toBeInTheDocument();    
    expect(table).toBeInTheDocument();    

})

test('test buttons onClick', () => {
    const rootStore: RootStore = new RootStore();
    const history = createMemoryHistory();
    render(
        <Provider {...rootStore}>
            <ShoppingList />
         </Provider>)
    const addButton = screen.getByRole('button', {name: 'add'}); 
    fireEvent.click(addButton);
    console.log(open);
    expect(open).toBeTruthy();  
})

test('test object of shoppinglist', () => { 
    const shoppinglist: IAddShoppingList = {
        name: "Shopping",
        items: [],
        created: new Date("2021-02-14T15:27:16.098Z")
      };
      expect(shoppinglist).toMatchSnapshot();
})


/*test('rendering Formik form',() => {
    const rootStore: RootStore = new RootStore();
    render(
        <Provider {...rootStore}>
            <ShoppingList />
         </Provider>)
    const label = screen.getByLabelText('Name')
    userEvent.type(label, 'Shopping');

})*/

