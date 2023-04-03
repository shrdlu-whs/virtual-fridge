import * as React from "react";
import Grid from "@material-ui/core/Grid";
import HeaderContainer from "../../components/header/headerContainer";
import { Typography } from "@material-ui/core";
import ProductCardsContainer from "../../components/products-content/productCardsContainer"

interface IProductsProps {}


const Products = () => {
  return (
    <div>
       <ProductCardsContainer />
    </div>
  );
};

export default Products;