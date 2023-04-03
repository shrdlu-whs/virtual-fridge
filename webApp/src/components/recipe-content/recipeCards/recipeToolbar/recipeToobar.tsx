import React from "react";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import { useTranslation } from "react-i18next";
import { useStyles } from "./recipeToobar.styles";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import InputBase from "@material-ui/core/InputBase";
import Fab from "@material-ui/core/Fab";
import { AppBar, Grid } from "@material-ui/core";

interface IronStockToobalbarProps {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddRecipe: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isMobile: boolean;
}

const IronStockToobalbar = (props: IronStockToobalbarProps) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { handleSearch, handleAddRecipe, isMobile } = props;

  return (
    <Toolbar className={classes.root}>
      <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
        {t("title.recipe_toolbar")}
      </Typography>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder={t("action.search")}
          onChange={handleSearch}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
      {!isMobile ? (
        <>
          <Tooltip title={t("label.recipe_add_tooltip") || ""}>
            <IconButton onClick={handleAddRecipe} aria-label="add">
              <AddIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Grid className={classes.fabContainer} container direction="column" justify="flex-end" alignItems="flex-end" spacing={1} style={{ zIndex: 1 }}>
          <Grid item>
            <Fab onClick={handleAddRecipe} color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>
      )}
    </Toolbar>
  );
};

export default IronStockToobalbar;
