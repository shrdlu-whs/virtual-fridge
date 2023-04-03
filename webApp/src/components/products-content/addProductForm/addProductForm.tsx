import React, { useEffect } from "react";
import * as Yup from "yup";
import clsx from "clsx";
import { runInAction } from "mobx";
import { Formik } from "formik";
import { IApiProduct } from "../../../interfaces/api/api-product.interface";
import { IApiProductItem } from "../../../interfaces/api/api-productItem.interface";
import { IApiCategory } from "../../../interfaces/api/api-category.interface";
import { ProductStore } from "../../../store/productStore";
import { CategoryStore } from "../../../store/categoryStore";
import { UiStateStore } from "../../../store/uiStateStore";
import { useTranslation } from "react-i18next";
import { useStyles } from "./addProductForm.styles";
import RequestButton from "../../request-button/requestButton";
import ExitToApp from "@material-ui/icons/ExitToApp";
import {
  FormControl,
  Toolbar,
  Button,
  Chip,
  Grid,
  Paper,
  TextField,
  Tooltip,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Checkbox,
  IconButton,
  Collapse,
  InputLabel,
  Select,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { inject, observer } from "mobx-react";
import {
  ICategory,
  INutritionValue,
  IProductItem,
  IProduct,
} from "../../../interfaces/froms/addProductForm.interface";
import { Category } from "@material-ui/icons";
import AddProductItemForm from "./addProductItemForm/addProductItemForm";
import ProductItemsTable from "./productItemsTable/productItemsTable";

interface IAddProductFormProps {
  productStore?: ProductStore;
  uiStateStore?: UiStateStore;
  categoryStore?: CategoryStore;
  isSubmitting: boolean;
  isMobile: boolean;
  handleAddProduct: (product: IApiProduct) => void;
  handleAddProductCancel: () => void;
}

export const AddProductForm = ({
  productStore,
  uiStateStore,
  categoryStore,
  isSubmitting,
  isMobile,
  handleAddProduct,
  handleAddProductCancel,
}: IAddProductFormProps) => {
  const [categories, setCategories] = React.useState<IApiCategory[]>([]);
  const { t } = useTranslation();
  const classes = useStyles();

  React.useEffect(() => {
    // categoryStore!.getCategories();
  }, []);

  const validateProduct = (formData: IProduct) => {
    const product: IApiProduct = {
      name: formData.name,
      iconPath: "",
      category: formData.category.map(
        (category): IApiCategory => {
          return { id: category.id, name: category.name };
        }
      ),
      unitDefaultQuantity: 100,
      totalQuantity: formData.totalQuantity,
      minQuantity: -1,
      unit: formData.unit,
      items: formData.items.map(
        (item): IApiProductItem => {
          return {
            barcode: item.barcode,
            expirationDate: new Date(item.expirationDate),
          };
        }
      ),
      nutritionalValue: formData.nutritionalValue,
    };
    product!.nutritionalValue!.nutritionScore = nutriState;
    handleAddProduct(product);
    productStore!.resetAddProductFormData();
  };

  const handleAddProductCancelClick = () => {
    productStore!.resetAddProductFormData();
    handleAddProductCancel();
  };

  const handleAddProductItem = (productItem: IProductItem) => {
    runInAction(() => productStore!.addProductFormData.items.push(productItem));
  };

  const handleDeleteProductItems = (uuids: string[]) => {
    for (const uuid of uuids) {
      const index = productStore!.addProductFormData.items.findIndex(
        (item) => item.uuid === uuid
      );
      if (index !== -1) {
        runInAction(() =>
          productStore!.addProductFormData.items.splice(index, 1)
        );
      }
    }
  };

  const handleUpdateProductItems = (
    item: IProductItem,
    barcode: string,
    expirationDate: Date
  ) => {
    runInAction(
      () => (
        (item.barcode = barcode),
        (item.expirationDate = expirationDate.toString())
      )
    );
  };

  const [catexpanded, setCatExpanded] = React.useState(false);
  const [itemexpanded, setItemExpanded] = React.useState(false);

  const handleCatExpandClick = () => {
    setCatExpanded(!catexpanded);
  };

  const handleItemExpandClick = () => {
    setItemExpanded(!itemexpanded);
  };

  const handleToggle = (value: number) => () => {
    let category = categoryStore!.categories.find(
      (element) => element.id === value
    );
    let index = productStore!.addProductFormData.category.findIndex(
      (x) => x.id === category!.id
    );
    if (index !== -1)
      productStore!.addProductFormData.category.splice(index, 1);
    else productStore!.addProductFormData.category.push(category!);
  };

  const [nutriState, setNutriState] = React.useState("");

  const handleNutriChange = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    const val = event.target.value as string;
    setNutriState(val);
  };

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item sm={9} md={5} lg={4} xl={3}>
        <Paper className={classes.addProductContentContainer}>
          <Typography
            className={classes.addProductTitle}
            component="h1"
            variant="h5"
          >
            {t("title.product_add_product_header")}
          </Typography>
          <Formik
            initialValues={productStore!.addProductFormData}
            onSubmit={(values) => {
              validateProduct(values);
            }}
            enableReinitialize
          >
            {({
              values,
              touched,
              errors,
              dirty,
              handleChange,
              handleBlur,
              handleSubmit,
              isValid,
            }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <div>
                    <TextField
                      label={t("label.product_name")}
                      name="name"
                      type="text"
                      variant="standard"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.name && errors.name}
                      error={touched.name && errors.name !== undefined}
                      margin="normal"
                      fullWidth
                      required
                    />
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          label={t("label.product_totalQuantity")}
                          name="totalQuantity"
                          type="number"
                          variant="standard"
                          value={values.totalQuantity}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={
                            touched.totalQuantity && errors.totalQuantity
                          }
                          error={
                            touched.totalQuantity &&
                            errors.totalQuantity !== undefined
                          }
                          margin="normal"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label={t("label.product_unit")}
                          name="unit"
                          type="text"
                          variant="standard"
                          value={values.unit}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={touched.unit && errors.unit}
                          error={touched.unit && errors.unit !== undefined}
                          margin="normal"
                          multiline
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <Grid container spacing={2}>
                    <Grid container item xs={6} alignItems="center">
                      {t("label.product_categories_title")}
                    </Grid>
                    <Grid item xs={6}>
                      <IconButton
                        className={clsx(classes.icon_expand, {
                          [classes.icon_expandOpen]: catexpanded,
                        })}
                        onClick={handleCatExpandClick}
                        aria-expanded={catexpanded}
                        aria-label="show more"
                      >
                        <ExpandMore />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Collapse in={catexpanded} timeout="auto" unmountOnExit>
                    <List className={classes.categorylist}>
                      {categoryStore!.categories.map((category) => {
                        const labelId = `checkbox-list-label-${category.id}`;

                        return (
                          <ListItem
                            key={category.id}
                            role={undefined}
                            dense
                            button
                            onClick={handleToggle(category.id)}
                          >
                            <ListItemIcon>
                              <Checkbox
                                edge="start"
                                // checked={checked.indexOf(category.id) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ "aria-labelledby": labelId }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              id={labelId}
                              primary={category.name}
                            />
                          </ListItem>
                        );
                      })}
                    </List>
                  </Collapse>
                  <hr />
                  <Grid container spacing={2}>
                    <Grid container item xs={6} alignItems="center">
                      {t("title.product_additems_title")}
                    </Grid>
                    <Grid item xs={6}>
                      <IconButton
                        className={clsx(classes.icon_expand, {
                          [classes.icon_expandOpen]: itemexpanded,
                        })}
                        onClick={handleItemExpandClick}
                        aria-expanded={itemexpanded}
                        aria-label="show more"
                      >
                        <ExpandMore />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Collapse in={itemexpanded} timeout="auto" unmountOnExit>
                    <ProductItemsTable
                      handleDeleteProductItems={handleDeleteProductItems}
                      handleUpdateProductItems={handleUpdateProductItems}
                      isMobile={isMobile}
                      rows={values.items}
                    />
                    <AddProductItemForm
                      products={productStore!.products}
                      handleAddProductItem={handleAddProductItem}
                    />
                  </Collapse>
                  <hr />
                  <Grid container spacing={2}>
                    <Grid container item xs={12} alignItems="center">
                      {t("label.product_values_in_hundrets")}
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="nutriScore">
                          {t("label.product_nutriScore")}
                        </InputLabel>
                        <Select
                          native
                          value={nutriState}
                          onChange={handleNutriChange}
                          inputProps={{
                            name: "nutritionalValue.nutritionScore",
                            id: "nutritionalValue.nutritionScore",
                          }}
                        >
                          <option aria-label="None" value="" />
                          <option value={"A"}>A</option>
                          <option value={"B"}>B</option>
                          <option value={"C"}>C</option>
                          <option value={"D"}>D</option>
                          <option value={"E"}>E</option>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label={t("label.product_calories")}
                        name="nutritionalValue.calories"
                        type="number"
                        variant="standard"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.unit && errors.unit}
                        error={touched.unit && errors.unit !== undefined}
                        margin="normal"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label={t("label.product_protein")}
                        name="nutritionalValue.protein"
                        type="number"
                        variant="standard"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.unit && errors.unit}
                        error={touched.unit && errors.unit !== undefined}
                        margin="normal"                        
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label={t("label.product_carbohydrates")}
                        name="nutritionalValue.carbohydrates"
                        type="number"
                        variant="standard"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.unit && errors.unit}
                        error={touched.unit && errors.unit !== undefined}
                        margin="normal"                        
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label={t("label.product_sugar")}
                        name="nutritionalValue.sugar"
                        type="number"
                        variant="standard"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.unit && errors.unit}
                        error={touched.unit && errors.unit !== undefined}
                        margin="normal"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label={t("label.product_fat")}
                        name="nutritionalValue.fat"
                        type="number"
                        variant="standard"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.unit && errors.unit}
                        error={touched.unit && errors.unit !== undefined}
                        margin="normal"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label={t("label.product_saturatedFat")}
                        name="nutritionalValue.saturatedFat"
                        type="number"
                        variant="standard"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.unit && errors.unit}
                        error={touched.unit && errors.unit !== undefined}
                        margin="normal"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label={t("label.product_fiber")}
                        name="nutritionalValue.fiber"
                        type="number"
                        variant="standard"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.unit && errors.unit}
                        error={touched.unit && errors.unit !== undefined}
                        margin="normal"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label={t("label.product_salt")}
                        name="nutritionalValue.salt"
                        type="number"
                        variant="standard"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.unit && errors.unit}
                        error={touched.unit && errors.unit !== undefined}
                        margin="normal"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Button
                        onClick={handleAddProductCancelClick}
                        color="primary"
                      >
                        {t("action.cancel")}
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <RequestButton
                        variant="contained"
                        color="primary"
                        fullWidth
                        type="submit"
                        loading={isSubmitting}
                        disabled={
                          !touched || isSubmitting || (dirty && !isValid)
                        }
                        endIcon={<ExitToApp />}
                      >
                        {t("action.add")}
                      </RequestButton>
                    </Grid>
                  </Grid>
                </form>
              );
            }}
          </Formik>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default inject(
  "productStore",
  "uiStateStore",
  "categoryStore"
)(observer(AddProductForm));
