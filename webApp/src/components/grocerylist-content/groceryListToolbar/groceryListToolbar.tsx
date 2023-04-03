import React, { useEffect } from "react";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import EditIcon from '@material-ui/icons/Edit';
import { useTranslation } from "react-i18next";
import { useStyles } from "./groceryListToolbar.styles";
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";
import SaveIcon from "@material-ui/icons/Save";
import Fab from "@material-ui/core/Fab";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Dialog, Select, TextField, MenuItem, Button } from "@material-ui/core"
import { IAddShoppingList, IApiShoppingList, IUpdateShoppingList } from "../../../interfaces/api/api-shoppinglist.interface";
import { useHistory } from "react-router-dom";
import RequestButton from "../../request-button/requestButton";
import { ProductStore } from "../../../store/productStore";
import { IApiProduct } from "../../../interfaces/api/api-product.interface";
import { IAddShoppinglistItem, IApiShoppinglistItem } from "../../../interfaces/api/api-shoppinglistItem.interface";
import { Formik } from "formik";
import { IUpdateShoppinglistItem } from "../../../interfaces/api/api-shoppinglistItem.interface";
//import { IApiShoppingList } from "../../interfaces/api/api-shoppinglist.interface";


interface GroceryListToolbarProps {
  handleOpenAddShoppingListForm: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleUpdateShoppingList: (shoppingList: IApiShoppingList) => void
  handleDeleteShoppingListItems: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleOpenEdit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleSaveEdit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleCancelEdit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  numSelected: number;
  isMobile: boolean;
  isEditing: boolean;
  isSubmitting: boolean;
  list?: IApiShoppingList;
  products?: IApiProduct[];
}

const GroceryListToolbar = ({
  handleUpdateShoppingList,
  handleOpenAddShoppingListForm,
  handleDeleteShoppingListItems,
  handleOpenEdit,
  handleSaveEdit,
  handleCancelEdit,
  numSelected, isMobile,
  isEditing, isSubmitting, list, products }: GroceryListToolbarProps) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [activeProduct, setActiveProduct] = React.useState<IApiProduct>();



  const inititalValue: IUpdateShoppinglistItem = {
    product: activeProduct!,
    quantity: 0,
    isAcquired: false
  };

  const validateShoppingListItem = (formData: IApiShoppinglistItem) => {
    const shoppingListItem: IApiShoppinglistItem = {
      product: activeProduct!,
      quantity: formData.quantity,
      isAcquired: false
    }
    list!.shoppingListItems.push(shoppingListItem);
    handleUpdateShoppingList(list!);
    setOpen(false);
  };

  const handleProductChange = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    const id = parseInt(event.target.value as string);
    const product = products!.find((product) => product.id === id);
    setActiveProduct(product);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleOverviewButton = () => {
    history.push(`/shopping`);
  }

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            {list?.name}
          </Typography>
        )}

      {numSelected > 0 ? (
        <>
        <Tooltip title="Delete" >
          <IconButton aria-label="delete"
            onClick={handleDeleteShoppingListItems}>
            <DeleteIcon />
          </IconButton>
          </Tooltip>
         
        </>
      ) : !isMobile ? (
        !isEditing ? (
        <>
          <Tooltip title="Produkt hinzufügen">
            <IconButton aria-label="add" onClick={handleClickOpen}>
              <AddIcon />
            </IconButton>
          </Tooltip> 
          <Tooltip title="Edit" >
          <IconButton aria-label="edit"
            onClick={handleOpenEdit}>
            <EditIcon />
          </IconButton>
          </Tooltip>
          <Tooltip title="Overview">
            <Button onClick={handleOverviewButton}>
              Übersicht
           </Button>
          </Tooltip>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Produkt hinzufügen</DialogTitle>
            <Formik
              initialValues={inititalValue}
              onSubmit={(values) => {
                validateShoppingListItem(values);
              }}>
              {({ values, touched, errors, dirty, handleChange, handleBlur, handleSubmit, isValid }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <DialogContent>
                      <DialogContentText>
                        Fügen Sie ein Produkt zu Ihrer Einkaufsliste hinzu. Wählen Sie dazu ein Produkt und Ihre gewünschte Menge aus.
         </DialogContentText>
                      <div>
                        <Select
                          className={classes.select}
                          onChange={handleProductChange}
                        // value={values.product}

                        >
                          {products!.map((product) => (
                            <option
                              key={product!.id}
                              value={product!.id}>{product!.name}
                            </option>
                          ))}
                        </Select>
                      </div>
                      <div>
                        <TextField
                          id="standard-number"
                          type="number"
                          name="quantity"
                          label="Menge"
                          value={values.quantity}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        Abbrechen
         </Button>
                      <RequestButton
                        variant="contained"
                        color="primary"
                        fullWidth
                        type="submit"
                        loading={isSubmitting}
                        disabled={!touched || isSubmitting || (dirty && !isValid)}>
                        Hinzufügen
         </RequestButton>
                    </DialogActions></form>
                );
              }}
            </Formik>
          </Dialog>
          </>
        ) : (
          <>
          <Tooltip title="Cancel">
            <IconButton onClick={handleCancelEdit}>
              <CancelIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Speichern">
            <IconButton onClick={handleSaveEdit}>
              <SaveIcon />
              </IconButton>
          </Tooltip>
          </>
        )
      ) : (
            <Fab className={classes.fab} color="primary" aria-label="add">
              <AddIcon />
            </Fab>

          )}
    </Toolbar>
  );
};

export default GroceryListToolbar;