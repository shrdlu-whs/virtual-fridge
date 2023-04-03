import React from "react";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import { useTranslation } from "react-i18next";
import { useStyles } from "./ingredients.styles";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import InputBase from "@material-ui/core/InputBase";
import Fab from "@material-ui/core/Fab";
import { Grid } from "@material-ui/core";
import { IApiProduct } from "../../../../../interfaces/api/api-product.interface";
import { IApiRecipeItem } from "../../../../../interfaces/api/api-recipeItem.interface";

interface IronStockToobalbarProps {
  handleDeleteIngredients: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  numSelected: number;
  isMobile: boolean;
}

const IngredientToolbar = (props: IronStockToobalbarProps) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { handleDeleteIngredients, numSelected, isMobile } = props;

  return (
    <Toolbar className={classes.root}>
      <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
        {t("title.ingredient_table")}
      </Typography>
      {numSelected > 0 && (
        <Tooltip title={t("label.iron-stock-delete-tooltip") || ""}>
          <IconButton onClick={handleDeleteIngredients} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default IngredientToolbar;
