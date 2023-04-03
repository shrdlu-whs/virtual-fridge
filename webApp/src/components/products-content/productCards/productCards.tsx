import React from "react";
import { useTranslation } from "react-i18next";
import { useStyles } from "./productCards.styles";
import { IProductCards } from "../../../interfaces/productCards.interface";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { IApiProduct } from "../../../interfaces/api/api-product.interface";
import { Grid, IconButton, Paper } from "@material-ui/core";
import Toolbar from "../productToolbar/productToolbar";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { inject, observer } from "mobx-react";

interface IProductCardsProps {
  handleAddProduct: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  handleDeleteProduct: (id: number) => void;
  handleRemoveProductQuantity: (product: IApiProduct) => void;
  handleAddProductQuantity: (product: IApiProduct) => void;
  handleShowProduct: (product: IApiProduct) => void;
  products: IApiProduct[];
  isMobile: boolean;
}

const ProductCards = ({
  handleAddProduct,
  handleDeleteProduct,
  handleRemoveProductQuantity,
  handleAddProductQuantity,
  handleShowProduct,
  products,
  isMobile,
}: IProductCardsProps) => {
  const [filteredProducts, setFilteredProducts] = React.useState<IApiProduct[]>(
    []
  );
  const { t } = useTranslation();
  const classes = useStyles();

  React.useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  //#region Filtering
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = event.target.value;
    const newFilteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(newVal)
    );
    setFilteredProducts(newFilteredProducts);
  };
  //#endregion

  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="center" alignItems="flex-start">
        <Grid container item xl={6} xs={12} justify="space-between" spacing={3}>
          <Toolbar
            handleAddProduct={handleAddProduct}
            handleSearch={handleSearch}
            isMobile={isMobile}
          />
          <Grid container spacing={2}>
            {filteredProducts.map((product) => {
              return (
                <Grid item xs={3}>
                  <Card className={classes.cardRoot}>
                    <CardActionArea 
                    // onClick={() => handleShowProduct(product)}
                    >
                      <CardMedia
                        className={classes.media}
                        image={
                          process.env.PUBLIC_URL +
                          "/images/cards/empty_product.jpg"
                        }
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {product.name}
                        </Typography>
                        <div>
                          {product.category ? product.category.map((category) => {
                                return (
                                  <Chip
                                    label={category.name}
                                    variant="outlined"
                                  /> //übersetzen
                                );
                              })
                            : ""}
                        </div>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          <span className={classes.nutritionScore}>
                            {t("label.product_nutriScore")}:{" "}
                            {product.nutritionalValue?.nutritionScore}
                          </span>
                          <span className={classes.totalQuantity}>
                            {t("label.product_totalQuantity")}:{" "}
                            {product.totalQuantity}
                          </span>
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Grid container spacing={1}>
                        <Grid container item xs={6} alignItems="center">
                          {t("label.product_cards_modify_quantity")}
                        </Grid>
                        <Grid item xs={6}>
                          <IconButton
                            aria-label="delete"
                            onClick={() => handleAddProductQuantity(product)}
                          >
                            <AddIcon />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            onClick={() => handleRemoveProductQuantity(product)}
                          >
                            <RemoveIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default observer(ProductCards);
