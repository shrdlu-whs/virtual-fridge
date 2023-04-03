import React from "react";
import IronStock from '../components/iron-stock-content/ironStockContainer'
import { render, screen, waitFor } from '@testing-library/react'; 
import DrawerWrapper from '../components/navigation-drawer/drawerWrapperContainer'
import { RootStore } from "../store/rootStore";
import { Provider } from "mobx-react";


const ironStock = require('../components/iron-stock-content/ironStockContainer');

test('ironStock exists', () => {
    expect(typeof ironStock).toEqual('object');
})
test('render about link', () => {
    const rootStore: RootStore = new RootStore();
    render(
        <Provider {...rootStore}>
            <IronStock />
         </Provider>)
    const edit = screen.getByRole('button',{name: 'edit'});
    const add = screen.getByRole('button',{name: 'add'});
    const button = screen.getByRole('button',{name: 'edit'});
    expect(edit).toBeInTheDocument();
    expect(add).toBeInTheDocument();
    expect(button).toBeInTheDocument();
});