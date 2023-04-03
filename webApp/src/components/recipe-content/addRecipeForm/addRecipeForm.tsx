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
import { IIronStockProduct } from "../../../interfaces/ironStockProduct.interface";
import { Formik } from "formik";
import * as Yup from "yup";
import { v4 } from "uuid";
import RequestButton from "../../request-button/requestButton";
import ExitToApp from "@material-ui/icons/ExitToApp";
import { IApiRecipe } from "../../../interfaces/api/api-recipe.interface";
import { IApiRecipeItem } from "../../../interfaces/api/api-recipeItem.interface";
import { IRecipeItem, IRecipe } from "../../../interfaces/froms/addRecipeForm.interface";
import { FormControl, Grid, Paper, Toolbar, Typography } from "@material-ui/core";
import { useStyles } from "./addRecipeForm.styles";
import { getMillesFromString } from "../../../utils/time.utils";
import IngredientsTable from "./ingredientsTable/ingredients";
import { ProductStore } from "../../../store/productStore";
import { RecipeStore } from "../../../store/recipeStore";
import { UiStateStore } from "../../../store/uiStateStore";
import { AddIngredientForm } from "./addIngredientForm/addIngredientForm";
import { inject, observer } from "mobx-react";
import { runInAction } from "mobx";
import { TextareaAutosize } from "@material-ui/core";

interface IAddRecipeDialogProps {
  recipeStore?: RecipeStore;
  productStore?: ProductStore;
  uiStateStore?: UiStateStore;
  isSubmitting: boolean;
  isMobile: boolean;
  handleAddRecipe: (recipe: IApiRecipe) => void;
  handleAddRecipeCancel: () => void;
}

export const AddRecipeDialog = ({
  productStore,
  recipeStore,
  uiStateStore,
  isSubmitting,
  isMobile,
  handleAddRecipe,
  handleAddRecipeCancel,
}: IAddRecipeDialogProps) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const difficulties = [
    { step: t(`value.recipe_difficulty_easy`), id: "easy" },
    { step: t(`value.recipe_difficulty_intermediate`), id: "intermediate" },
    { step: t(`value.recipe_difficulty_difficult`), id: "difficult" },
  ];

  React.useEffect(() => {
    productStore!.getProducts();
  }, []);

  const validateRecipe = (formData: IRecipe) => {
    const recipe: IApiRecipe = {
      name: formData.name,
      shortDescription: formData.shortDescription,
      instructions: formData.instructions,
      hyperlink: formData.hyperlink,
      expectedTime: getMillesFromString(formData.expectedTime),
      difficulty: formData.difficulty,
      // category: [],
      recipeItems: formData.recipeItems.map(
        (item): IApiRecipeItem => {
          return { quantity: item.quantity, product: item.product };
        }
      ),
      favorite: false,
      iconPath: "",
    };
    handleAddRecipe(recipe);
    recipeStore!.resetAddRecipeFormData();
  };

  const handleAddRecipeCancelClick = () => {
    recipeStore!.resetAddRecipeFormData();
    handleAddRecipeCancel();
  };

  const handleAddIngredient = (recipeItem: IRecipeItem) => {
    runInAction(() => recipeStore!.addRecipeFormData.recipeItems.push(recipeItem));
  };

  const handleRemoveIngredients = (uuids: string[]) => {
    for (const uuid of uuids) {
      const index = recipeStore!.addRecipeFormData.recipeItems.findIndex((ingredient) => ingredient.uuid === uuid);
      if (index !== -1) {
        runInAction(() => recipeStore!.addRecipeFormData.recipeItems.splice(index, 1));
      }
    }
  };

  const handleUpdateIngredient = (ingredient: IRecipeItem, quantity: number) => {
    runInAction(() => (ingredient.quantity = quantity));
  };

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item sm={9} md={5} lg={4} xl={3}>
        <Paper className={classes.addRecipeContentContainer}>
          <Typography className={classes.addRecipeTitle} component="h1" variant="h5">
            {t("title.recipe_add_recipe_header")}
          </Typography>
          <Formik
            initialValues={recipeStore!.addRecipeFormData}
            onSubmit={(values) => {
              validateRecipe(values);
            }}
            validationSchema={Yup.object().shape({
              hyperlink: Yup.string().url().required(t("label.no_valid_hyperlink")),
              shortDescription: Yup.string().max(255, t("label.no_valid_varChar255")),
            })}
            enableReinitialize
          >
            {({ values, touched, errors, dirty, handleChange, handleBlur, handleSubmit, isValid }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <div>
                    <TextField
                      label={t("label.recipe_name")}
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
                    <TextField
                      label={t("label.recipe_short_description")}
                      name="shortDescription"
                      type="text"
                      variant="standard"
                      value={values.shortDescription}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.shortDescription && errors.shortDescription}
                      error={touched.shortDescription && errors.shortDescription !== undefined}
                      margin="normal"
                      fullWidth
                    />
                    <TextField
                      label={t("label.recipe_instruction")}
                      name="instructions"
                      variant="standard"
                      value={values.instructions}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.instructions && errors.instructions}
                      error={touched.instructions && errors.instructions !== undefined}
                      margin="normal"
                      multiline
                      fullWidth
                    />
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          label={t("label.recipe_expected_time")}
                          name="expectedTime"
                          type="time"
                          value={values.expectedTime}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={touched.expectedTime && errors.expectedTime}
                          error={touched.expectedTime && errors.expectedTime !== undefined}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            step: 15,
                          }}
                          margin="normal"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl margin="normal" fullWidth>
                          <InputLabel htmlFor="id">{t("label.recipe-difficulty")}</InputLabel>
                          <Select
                            native
                            name="difficulty"
                            onChange={handleChange}
                            inputProps={{
                              step: "step",
                              id: "id",
                            }}
                          >
                            {difficulties.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.step}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <IngredientsTable
                      handleDeleteIngredient={handleRemoveIngredients}
                      handleUpdateIngredient={handleUpdateIngredient}
                      isMobile={isMobile}
                      rows={values.recipeItems}
                    />
                    <AddIngredientForm products={productStore!.products} handleAddIngredient={handleAddIngredient} />
                  </div>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Button onClick={handleAddRecipeCancelClick} color="primary">
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
                        disabled={!touched || isSubmitting || (dirty && !isValid)}
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

export default inject("productStore", "recipeStore", "uiStateStore")(observer(AddRecipeDialog));
