import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { useTranslation } from "react-i18next";
import { IIronStockProduct } from "../../../../interfaces/ironStockProduct.interface";
import { Formik } from "formik";
import * as Yup from "yup";
import AddIcon from "@material-ui/icons/Add";
import { IApiRecipe, Difficulty } from "../../../../interfaces/api/api-recipe.interface";
import { IApiRecipeItem } from "../../../../interfaces/api/api-recipeItem.interface";
import { IRecipe } from "../../../../interfaces/froms/addRecipeForm.interface";
import { FormControl, Grid, IconButton, Paper, Toolbar, Tooltip, Typography } from "@material-ui/core";
import IngredientsTable from "../ingredientsTable/ingredients";
import { ProductStore } from "../../../../store/productStore";
import { IApiProduct } from "../../../../interfaces/api/api-product.interface";
import { IRecipeItem } from "../../../../interfaces/froms/addRecipeForm.interface";
import { v4 } from "uuid";
import { observer } from "mobx-react";
import { useStyles } from "./addIngredientForm.styles";

interface IAddIngredientFormProps {
  products: IApiProduct[];
  handleAddIngredient: (recipeItem: IRecipeItem) => void;
}

export const AddIngredientForm = ({ products, handleAddIngredient }: IAddIngredientFormProps) => {
  const [activeProduct, setActiveProduct] = React.useState<IApiProduct>();
  const [quantity, setQuantity] = React.useState(1);
  const { t } = useTranslation();
  const classes = useStyles();

  useEffect(() => {
    const initialValue = products.length > 0 ? products[0] : undefined;
    setActiveProduct(initialValue);
  }, [products]);

  const handleAddIngredientClick = () => {
    if (activeProduct && quantity) {
      const ingredient: IRecipeItem = { uuid: v4(), product: activeProduct, quantity };
      handleAddIngredient(ingredient);
    }
  };

  const handleProductChange = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    const id = parseInt(event.target.value as string);
    const product = products.find((product) => product.id === id);
    setActiveProduct(product);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <TextField
          label={t("label.ingredient-quantity")}
          name="quantity"
          type="number"
          variant="standard"
          value={quantity}
          onChange={(evt) => setQuantity(parseInt(evt.currentTarget.value))}
          inputProps={{ min: 1 }}
          margin="normal"
          fullWidth
          disabled={!activeProduct}
          required
        />
      </Grid>
      <Grid item xs={6}>
        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="id">{t("label.recipe-product-name")}</InputLabel>
          <Select
            native
            onChange={handleProductChange}
            inputProps={{
              name: "name",
              id: "id",
            }}
            disabled={!activeProduct}
          >
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        <IconButton className={classes.ingredientButton} onClick={handleAddIngredientClick} aria-label="add" disabled={!activeProduct}>
          <AddIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default observer(AddIngredientForm);
