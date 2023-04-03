import React from "react";
//import IronStock from '../components/iron-stock-content/ironStockContainer'
import { render, screen } from '@testing-library/react'; 
//import Recipe from '../components/recipe-content/recipesContainer'
import { RootStore } from "../store/rootStore";
import { Provider } from "mobx-react";

const header = require('../components/header/headerContainer');

test('header exists', () => {
    expect(typeof header).toEqual('object');
});