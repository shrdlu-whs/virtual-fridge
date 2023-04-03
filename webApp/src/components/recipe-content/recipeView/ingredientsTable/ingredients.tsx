import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useStyles } from "./ingredients.styles";
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
import IngredientsHeader from "./ingredientsHeader/ingredientsHeader";
import IngredientToolbar from "./ingredientsToobar/ingredientsToobar";
import { observer } from "mobx-react";
import { ProductStore } from "../../../../store/productStore";
import { TextField } from "@material-ui/core";
import { IApiProduct } from "../../../../interfaces/api/api-product.interface";
import { IRecipeItem } from "../../../../interfaces/froms/addRecipeForm.interface";
import { IApiRecipeItem } from "../../../../interfaces/api/api-recipeItem.interface";
import { v4 } from "uuid";
import clsx from "clsx"
import { closeSync } from "fs";

interface IIngredientProps {
  rows: IApiRecipeItem[];
  portions: number;
}

const Ingredients = ({ rows, portions }: IIngredientProps) => {
  //#region Props
  const { t } = useTranslation();
  const classes = useStyles();
  const [dense, setDense] = React.useState(true);
  //#endregion

  const emptyRows = 1 - rows.length > 0 ? 1 - rows.length : 0;

  const getQuantityColor = (quant: number, totalQuant: number) => {
    if(quant < totalQuant) {
      return classes.green
    } else if(quant == totalQuant) {
      return classes.green // Yellow not visible enought
    } else {
      return classes.red
    }
  }

  return (
    <div className={classes.root}>
      <IngredientToolbar />
      <TableContainer>
        <Table aria-labelledby="tableTitle" size={dense ? "small" : "medium"} aria-label="enhanced table">
          <IngredientsHeader />
          <TableBody>
            {rows.slice().map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <TableRow hover tabIndex={-1} key={v4()}>
                  <TableCell className={getQuantityColor(row.quantity * portions, row.product.totalQuantity)} component="th" id={labelId} scope="row" padding="default">
                    {`${row.quantity * portions} ${row.product.unit}`}
                  </TableCell>
                  <TableCell component="th" id={labelId} scope="row" padding="default">
                    {`${row.product.totalQuantity} ${row.product.unit}`}
                  </TableCell>
                  <TableCell component="th" id={labelId} scope="row" padding="default">
                    {`${row.product.name}`}
                  </TableCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow style={{ height: dense ? 33 * emptyRows : 65 * emptyRows }}>
                <TableCell colSpan={4} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default observer(Ingredients);
