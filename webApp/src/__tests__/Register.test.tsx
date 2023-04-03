import React from "react";
import IronStock from '../components/iron-stock-content/ironStockContainer'
import { render, screen } from '@testing-library/react'; 
import RegisterForm from '../components/register-content/registerContainer'
import { RootStore } from "../store/rootStore";
import { Provider } from "mobx-react";
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

const register = require('../components/register-content/registerContainer')

test ('Register exists', () => {
    expect(typeof register).toEqual('object');  
});

test('render about link', () => {
    const rootStore: RootStore = new RootStore();
    const history = createMemoryHistory();
    render(
        <Provider {...rootStore}>
            <Router history={history}>
            <RegisterForm /></Router>
         </Provider>)
    const all = screen.getByRole('heading');
})

