import React from "react";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import { useTranslation } from "react-i18next";
import { useStyles } from "./ironStockToobar.styles";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import InputBase from "@material-ui/core/InputBase";
import Fab from "@material-ui/core/Fab";
import { Grid } from "@material-ui/core";

interface IronStockToolbarProps {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddProduct: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleEditProduct: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleCancelEdit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleSaveEdit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleDeleteProducts: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  numSelected: number;
  isMobile: boolean;
  isEditing: boolean;
}

const IronStockToolbar = (props: IronStockToolbarProps) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const {
    handleSearch,
    handleAddProduct,
    handleEditProduct,
    handleCancelEdit,
    handleSaveEdit,
    handleDeleteProducts,
    numSelected,
    isEditing,
    isMobile,
  } = props;

  return (
    <Toolbar className={classes.root}>
      <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
        {t("title.iron_stock_table")}
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
      {numSelected > 0 && !isEditing ? (
        !isMobile ? (
          <Tooltip title={t("label.iron-stock-delete-tooltip") || ""}>
            <IconButton onClick={handleDeleteProducts} aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Grid className={classes.fabContainer} container direction="column" justify="flex-end" alignItems="flex-end" spacing={1}>
            <Grid item>
              <Fab onClick={handleDeleteProducts} color="primary" aria-label="delete">
                <DeleteIcon />
              </Fab>
            </Grid>
          </Grid>
        )
      ) : !isMobile ? (
        !isEditing ? (
          <>
            <Tooltip title={t("label.iron-stock-edit-tooltip") || ""}>
              <IconButton onClick={handleEditProduct} aria-label="edit">
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={t("label.iron-stock-add-tooltip") || ""}>
              <IconButton onClick={handleAddProduct} aria-label="add">
                <AddIcon />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <>
            <Tooltip title={t("label.iron-stock-cancel-tooltip") || ""}>
              <IconButton onClick={handleCancelEdit} aria-label="cancel">
                <CancelIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={t("label.iron-stock-save-tooltip") || ""}>
              <IconButton onClick={handleSaveEdit} aria-label="save">
                <SaveIcon />
              </IconButton>
            </Tooltip>
          </>
        )
      ) : !isEditing ? (
        <Grid className={classes.fabContainer} container direction="column" justify="flex-end" alignItems="flex-end" spacing={1}>
          <Grid item>
            <Fab onClick={handleEditProduct} color="primary" aria-label="edit">
              <EditIcon />
            </Fab>
          </Grid>
          <Grid item>
            <Fab onClick={handleAddProduct} color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>
      ) : (
        <Grid className={classes.fabContainer} container direction="column" justify="flex-end" alignItems="flex-end" spacing={1}>
          <Grid item>
            <Fab onClick={handleCancelEdit} color="primary" aria-label="cancel">
              <CancelIcon />
            </Fab>
          </Grid>
          <Grid item>
            <Fab onClick={handleSaveEdit} color="primary" aria-label="save">
              <SaveIcon />
            </Fab>
          </Grid>
        </Grid>
      )}
    </Toolbar>
  );
};

export default IronStockToolbar;
