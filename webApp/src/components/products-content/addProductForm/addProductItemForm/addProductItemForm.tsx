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
import {
  IApiRecipe
} from "../../../../interfaces/api/api-recipe.interface";
import { IApiRecipeItem } from "../../../../interfaces/api/api-recipeItem.interface";
import { IRecipe } from "../../../../interfaces/froms/addRecipeForm.interface";
import {
  FormControl,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import ProductItemsTable from "../productItemsTable/productItemsTable";
import { ProductStore } from "../../../../store/productStore";
import { IApiProduct } from "../../../../interfaces/api/api-product.interface";
import { IProductItem } from "../../../../interfaces/froms/addProductForm.interface";
import { v4 } from "uuid";
import { observer } from "mobx-react";
import { useStyles } from "./addProductItemForm.styles";

interface IAddProductItemFormProps {
  products: IApiProduct[];
  handleAddProductItem: (productItem: IProductItem) => void;
}

export const AddProductItemForm = ({
  products,
  handleAddProductItem,
}: IAddProductItemFormProps) => {
  const [barcode, setBarcode] = React.useState<string>("1");
  const [expiringDate,setExpiringDate] = React.useState(new Date().toString());
  const { t } = useTranslation();
  const classes = useStyles();

  useEffect(() => {}, []);

  const handleAddProductItemClick = () => {
    if (barcode && expiringDate) {
      const productItem: IProductItem = {
        uuid: v4(),
        barcode: barcode,
        expirationDate: expiringDate,
      };
      handleAddProductItem(productItem);
    }
  };    

  var someDate = new Date();
  var numberOfDaysToAdd = 3;
  var date = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);

  return (
    <Grid container spacing={2}>
      <Grid container item xs={3} >
        <TextField
          label={t("label.productItem_barcode")}
          name="barcode"
          type="number"
          variant="standard"
          value={barcode}
          onChange={(evt) => setBarcode(evt.currentTarget.value)}
          inputProps={{ min: 1 }}
          margin="normal"
          fullWidth
          required
        />
      </Grid>
      <Grid container item xs={6} alignItems="center">
        <TextField
          id="expiringDate"
          name="expiringDate"
          label={t("label.productItem_expiringDate")}
          type="date"
          defaultValue={date}
          onChange={(evt) => setExpiringDate(evt.currentTarget.value)}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
      </Grid>
      <Grid item xs={3}>
        <IconButton
          className={classes.productItemButton}
          onClick={handleAddProductItemClick}
          aria-label="add"
          // disabled={!activeProduct}
        >
          <AddIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default observer(AddProductItemForm);
