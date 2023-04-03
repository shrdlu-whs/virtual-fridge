import React from "react";
import IronStock from '../components/iron-stock-content/ironStockContainer'
import { render, screen } from '@testing-library/react'; 
import SignIn from '../components/signIn-content/signInContainer'
import { RootStore } from "../store/rootStore";
import { Provider } from "mobx-react";
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import '@testing-library/jest-dom/extend-expect'


const signIn = require('../components/signIn-content/signInContainer')

test('signIn exists', () => {
    expect(typeof signIn).toEqual('object');
});

test('render about link', () => {
    const history = createMemoryHistory()
    const rootStore: RootStore = new RootStore();
    render(
        <Provider {...rootStore}>
            <Router history={history}>
            <SignIn /></Router>
  </Provider>);
    
});
test('should show login form', () => {
    const history = createMemoryHistory()
    const rootStore: RootStore = new RootStore();
    render(
        <Provider {...rootStore}>
            <Router history={history}>
            <SignIn /></Router>
         </Provider>);
    const input = screen.getByRole('heading', {name:'title.signIn'});
    expect(input).toBeInTheDocument();    
});