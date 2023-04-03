import React from "react";
import Account from '../components/account/accountMenuContainer'
import { render, screen } from '@testing-library/react'; 
import DrawerWrapper from '../components/navigation-drawer/drawerWrapperContainer'
import { RootStore } from "../store/rootStore";
import { Provider } from "mobx-react";

const account = require('../components/account/accountMenuContainer');

test('account exists', () => {
    expect(typeof account).toEqual('object');
})
test('render about link', () => {
    const rootStore: RootStore = new RootStore();
    render(
        <Provider {...rootStore}>
            <Account />
         </Provider>)

    const headring = screen.getByLabelText('account of current user');
})
