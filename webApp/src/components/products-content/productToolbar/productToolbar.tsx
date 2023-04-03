import React from "react";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import { useTranslation } from "react-i18next";
import { useStyles } from "./productToolbar.styles";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import InputBase from "@material-ui/core/InputBase";
import Fab from "@material-ui/core/Fab";
import { AppBar, Grid } from "@material-ui/core";

interface ProductToobalbarProps {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddProduct: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isMobile: boolean;
}

const ProductToolbar = (props: ProductToobalbarProps) => {
  const { t } = useTranslation();
  const classes = useStyles(); 
  const { handleSearch, handleAddProduct, isMobile } = props;

  return (
    <Toolbar className={classes.root}>
      <Typography className={classes.title} variant="h6" id="productTableTitle" component="div">
        {t("title.product_toolbar")}
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
          <Tooltip title={t("label.product_add_tooltip") || ""}>
            <IconButton onClick={handleAddProduct} aria-label="add">
              <AddIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Grid className={classes.fabContainer} container direction="column" justify="flex-end" alignItems="flex-end" spacing={1} style={{ zIndex: 1 }}>
          <Grid item>
            <Fab onClick={handleAddProduct} color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>
      )}
    </Toolbar>
  );
};

export default ProductToolbar;
