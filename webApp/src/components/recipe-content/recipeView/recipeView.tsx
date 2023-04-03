import * as React from "react";
import { Button, Chip, Grid, Paper, TextField, Tooltip, Typography } from "@material-ui/core";
import { useStyles } from "./recipeView.styles";
import { useTranslation } from "react-i18next";
import { inject, observer } from "mobx-react";
import DifficultIcon from "@material-ui/icons/Equalizer";
import TimeIcon from "@material-ui/icons/Schedule";
import { ProductStore } from "../../../store/productStore";
import { RecipeStore } from "../../../store/recipeStore";
import { UiStateStore } from "../../../store/uiStateStore";
import IngredientsTable from "./ingredientsTable/ingredients";
import NutritionValuesTable from "./nutritionValuesTable/nutritions";
import { IApiRecipeItem } from "../../../interfaces/api/api-recipeItem.interface";
import { IApiNutritionValues } from "../../../interfaces/api/api-nutritionValues.interface";
import { getMinutesTotalRounded } from "../../../utils/time.utils";

interface IRecipeViewProps {
  recipeStore?: RecipeStore;
  productStore?: ProductStore;
  uiStateStore?: UiStateStore;
  handleReturnToOverview: () => void;
}

const nutritionValuesDefault = {
  nutritionScore: "",
  calories: 0,
  protein: 0,
  carbohydrates: 0,
  sugar: 0,
  fat: 0,
  saturatedFat: 0,
  fiber: 0,
  salt: 0,
};

const RecipeView = ({ productStore, recipeStore, uiStateStore, handleReturnToOverview }: IRecipeViewProps) => {
  const [portions, setPortions] = React.useState(1);
  const [nutritionsValues, setNutritionValues] = React.useState<IApiNutritionValues>({ ...nutritionValuesDefault });
  const { t } = useTranslation();
  const classes = useStyles();

  React.useEffect(() => {
    const nutrition = getNutritionValuesTotal(recipeStore!.activeRecipe!.recipeItems);
    setNutritionValues(nutrition);
  }, [recipeStore!.activeRecipe!.recipeItems]);

  const getNutritionValuesTotal = (recipeItems: IApiRecipeItem[]) => {
    const nutritionValue: IApiNutritionValues = { ...nutritionValuesDefault };
    recipeItems.map((items) => {
      if (items.product.nutritionalValue) {
        nutritionValue.calories += items.product.nutritionalValue.calories;
        nutritionValue.protein += items.product.nutritionalValue.protein;
        nutritionValue.carbohydrates += items.product.nutritionalValue.carbohydrates;
        nutritionValue.sugar += items.product.nutritionalValue.sugar;
        nutritionValue.fat += items.product.nutritionalValue.fat;
        nutritionValue.saturatedFat += items.product.nutritionalValue.saturatedFat;
        nutritionValue.fiber += items.product.nutritionalValue.fiber;
        nutritionValue.salt += items.product.nutritionalValue.salt;
      }
    });
    return nutritionValue;
  };

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={12} sm={12} md={8} lg={8} xl={6}>
        <Paper className={classes.recipeContentContainer}>
          <Typography className={classes.recipeTitle} component="h1" variant="h5">
            {recipeStore!.activeRecipe!.name}
          </Typography>
          <Typography component="h1" variant="h6">
            {t(`label.recipe_short_description`)}
          </Typography>
          <Typography component="h1" variant="body1">
            {recipeStore!.activeRecipe!.shortDescription || t(`body.recipe_no_text`)}
          </Typography>
          <IngredientsTable rows={recipeStore!.activeRecipe!.recipeItems} portions={portions} />
          <NutritionValuesTable nutrition={nutritionsValues} />
          <Grid container justify="space-between">
            <Grid item xs={6}>
              <Typography component="h1" variant="h6">
                {t(`title.recipe_view_portions`)}
              </Typography>
              <TextField
                label="Portionen"
                type="number"
                variant="standard"
                value={portions}
                onChange={(evt) => setPortions(parseInt(evt.currentTarget.value))}
                inputProps={{ min: 1 }}
                margin="normal"
              />
            </Grid>
            <Grid container item xs={6}>
              <Grid item>
                <Typography component="h1" variant="h6">
                  {t(`title.recipe_view_other`)}
                </Typography>
              </Grid>
              <Grid container item spacing={2}>
                <Grid item>
                  <Tooltip title={"Schwierigkeit"}>
                    <Chip icon={<DifficultIcon />} label={t(`value.recipe_difficulty_${recipeStore!.activeRecipe!.difficulty}`)} clickable color="primary" />
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title={"Zeit"}>
                    <Chip icon={<TimeIcon />} label={getMinutesTotalRounded(recipeStore!.activeRecipe!.expectedTime)} clickable color="primary" />
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Typography component="h1" variant="h6">
            {t(`label.recipe_instruction`)}
          </Typography>
          <Typography component="h1" variant="body1">
            {recipeStore!.activeRecipe!.instructions || t(`body.recipe_no_text`)}
          </Typography>
          <Button onClick={() => handleReturnToOverview()} color="primary" variant="contained" style={{ marginTop: 20 }} fullWidth>
            {t("action.close")}
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default inject("productStore", "recipeStore", "uiStateStore")(observer(RecipeView));
