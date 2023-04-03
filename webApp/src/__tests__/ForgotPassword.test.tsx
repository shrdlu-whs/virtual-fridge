import React from "react";
import ForgotPassword from '../components/forgot-password-content/forgotPasswordContainer'
import { render, screen } from '@testing-library/react'; 
import DrawerWrapper from '../components/navigation-drawer/drawerWrapperContainer'
import { RootStore } from "../store/rootStore";
import { Provider } from "mobx-react";
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

const forgotPassword = require('../components/forgot-password-content/forgotPasswordContainer');

test('forgotPassword exists',() => {
    expect(typeof forgotPassword).toEqual('object');
})
test('render about link', () => {
    const rootStore: RootStore = new RootStore();
    const history = createMemoryHistory();
    render(
        <Provider {...rootStore}>
            <Router history={history}>
            <ForgotPassword />
            </Router>
         </Provider>)
});

test('formik data',() => {

});

test('get buttons from componente', () => {
    const rootStore: RootStore = new RootStore();
    const history = createMemoryHistory();
    render(
        <Provider {...rootStore}>
            <Router history={history}>
            <ForgotPassword />
            </Router>
         </Provider>)
    const confirm= screen.getByRole('button', {name: /action\.confirm/i});
});