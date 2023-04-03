import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useStyles } from "./nutritions.styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Switch from "@material-ui/core/Switch";
import { Order, getComparator, stableSort } from "../../../../utils/sort.utils";
import NutritionsHeader from "./nutritionsHeader/nutritionsHeader";
import NutritionToolbar from "./nutritionsToobar/nutritionsToobar";
import { observer } from "mobx-react";
import { ProductStore } from "../../../../store/productStore";
import { TextField } from "@material-ui/core";
import { IApiProduct } from "../../../../interfaces/api/api-product.interface";
import { IRecipeItem } from "../../../../interfaces/froms/addRecipeForm.interface";
import { IApiRecipeItem } from "../../../../interfaces/api/api-recipeItem.interface";
import { IApiNutritionValues } from "../../../../interfaces/api/api-nutritionValues.interface";
import { v4 } from "uuid";

interface INutritionsProps {
  nutrition: IApiNutritionValues;
}

const Nutritions = ({ nutrition }: INutritionsProps) => {
  //#region Props
  const { t } = useTranslation();
  const classes = useStyles();
  const [dense, setDense] = React.useState(true);
  //#endregion

  return (
    <div className={classes.root}>
      <NutritionToolbar />
      <TableContainer>
        <Table className={classes.table} aria-labelledby="tableTitle" size={dense ? "small" : "medium"} aria-label="enhanced table">
          <NutritionsHeader />
          <TableBody>
            <TableRow hover tabIndex={-1} key={v4()}>
              <TableCell component="td" scope="row" padding="default">
                {t("label.nutrition_calories")}
              </TableCell>
              <TableCell component="th" scope="row" padding="default">
                {`${nutrition.calories} kcal`}
              </TableCell>
            </TableRow>
            <TableRow hover tabIndex={-1} key={v4()}>
              <TableCell component="td" scope="row" padding="default">
                {t("label.nutrition_fat")}
              </TableCell>
              <TableCell component="th" scope="row" padding="default">
                {`${nutrition.fat} g`}
              </TableCell>
            </TableRow>
            <TableRow hover tabIndex={-1} key={v4()}>
              <TableCell component="td" scope="row" padding="default">
                {t("label.nutrition_saturatedFat")}
              </TableCell>
              <TableCell component="th" scope="row" padding="default">
                {`${nutrition.saturatedFat} g`}
              </TableCell>
            </TableRow>
            <TableRow hover tabIndex={-1} key={v4()}>
              <TableCell component="td" scope="row" padding="default">
                {t("label.nutrition_carbohydrates")}
              </TableCell>
              <TableCell component="th" scope="row" padding="default">
                {`${nutrition.carbohydrates} g`}
              </TableCell>
            </TableRow>
            <TableRow hover tabIndex={-1} key={v4()}>
              <TableCell component="td" scope="row" padding="default">
                {t("label.nutrition_sugar")}
              </TableCell>
              <TableCell component="th" scope="row" padding="default">
                {`${nutrition.sugar} g`}
              </TableCell>
            </TableRow>
            <TableRow hover tabIndex={-1} key={v4()}>
              <TableCell component="td" scope="row" padding="default">
                {t("label.nutrition_fiber")}
              </TableCell>
              <TableCell component="th" scope="row" padding="default">
                {`${nutrition.fiber} g`}
              </TableCell>
            </TableRow>
            <TableRow hover tabIndex={-1} key={v4()}>
              <TableCell component="td" scope="row" padding="default">
                {t("label.nutrition_protein")}
              </TableCell>
              <TableCell component="th" scope="row" padding="default">
                {`${nutrition.protein} g`}
              </TableCell>
            </TableRow>
            <TableRow hover tabIndex={-1} key={v4()}>
              <TableCell component="td" scope="row" padding="default">
                {t("label.nutrition_salt")}
              </TableCell>
              <TableCell component="th" scope="row" padding="default">
                {`${nutrition.salt} g`}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default observer(Nutritions);
