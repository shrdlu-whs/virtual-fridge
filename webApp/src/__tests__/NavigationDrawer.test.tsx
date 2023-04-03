import React from 'react';
import { render, screen } from '@testing-library/react'; 
import NavigationMenu from '../components/navigation-drawer/navigation-menu/navigationMenuContainer'
import { RootStore } from "../store/rootStore";
import { Provider } from "mobx-react";
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

const navigationDrawer = require('../components/navigation-drawer/drawerWrapperContainer')

test('navigationDrawer exists', () => {
    expect(typeof navigationDrawer).toEqual('object');
});

test('render about link', () => {
    const rootStore: RootStore = new RootStore();
    const history = createMemoryHistory();
    render(
        <Provider {...rootStore}>
            <Router history={history}>
            <NavigationMenu /></Router>
         </Provider>)
});