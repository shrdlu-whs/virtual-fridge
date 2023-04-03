import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import { useTranslation } from "react-i18next";
import { useStyles } from "./shoppinglistsToolbar.styles";
import AddIcon from "@material-ui/icons/Add";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IAddShoppingList, IApiShoppingList } from './../../../../interfaces/api/api-shoppinglist.interface'
import { Dialog, Select, TextField, MenuItem, Button } from "@material-ui/core"
import { inject, observer } from "mobx-react";
import { Formik } from "formik";
import RequestButton from "../../../request-button/requestButton";
import { ShoppingListStore } from "../../../../store/shoppinglistStore";
import AddShoppingListItems from "./addShoppingListItems/addShoppingListItems";
import { IApiProduct } from '../../../../interfaces/api/api-product.interface';
import {IAddShoppinglistItem} from '../../../../interfaces/api/api-shoppinglistItem.interface' 
import { runInAction } from "mobx";
import ShoppingListItems from './ShoppingListItemsTable/ShoppingListItems';

interface IShoppinglistsToolbar {
  shoppingListStore?: ShoppingListStore;
  isMobile: boolean;
  isSubmitting: boolean;
  products?: IApiProduct[];
  handleAddShoppingList: (shoppingList: IAddShoppingList) => void;
  handleDeleteShoppingList: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ShoppinglistsToolbar = ({ 
  shoppingListStore,
  isMobile,
  isSubmitting, 
  products,
  handleAddShoppingList, 
  handleDeleteShoppingList }: IShoppinglistsToolbar) => {
  const inititalValue: IAddShoppingList = {
    name: "",
    shoppingListItems: [],
    created: new Date()
  };
  const { t } = useTranslation();
  const classes = useStyles();

  const validateShoppingList = (formData: IAddShoppingList) => {
    const shoppingList: IAddShoppingList = {
      name: formData.name,
      shoppingListItems: shoppingListStore!.addShoppingListFormData.shoppingListItems ,
      created: new Date()
    };
    handleAddShoppingList(shoppingList);
    shoppingListStore!.resetAddShoppingListFormData();
    setOpen(false);
  };
  const shoppinglist: IAddShoppingList = {
    name: "Liste 1",
    shoppingListItems: [],
    created: new Date()
  };

  const handleAddShoppingListItem = (shoppingListItem: IAddShoppinglistItem) => {
    runInAction(() => shoppingListStore!.addShoppingListFormData.shoppingListItems.push(shoppingListItem));
  }
  //const { isMobile } = props;
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    // const shoppingList: IAddShoppingList = {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <Toolbar>
      <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
        {t("title.grocery_list_table")}
      </Typography>
      <Tooltip title="Delete">
        <IconButton aria-label="delete" onClick={handleDeleteShoppingList}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <div>
        <Tooltip title="Produkt hinzufügen">
          <IconButton aria-label="add" onClick={handleClickOpen}>
            <AddIcon />
          </IconButton>
        </Tooltip>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Produkt hinzufügen</DialogTitle>

          <Formik
            initialValues={inititalValue}
            onSubmit={(values) => {
              validateShoppingList(values);
            }}>
            {({ values, touched, errors, dirty, handleChange, handleBlur, handleSubmit, isValid }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <DialogContent>
                    <DialogContentText>
                      Fügen Sie eine neue Einkaufsliste hinzu.
        </DialogContentText>
                    <div>
                      <TextField
                        type="text"
                        label="Name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                     </div>
                     <AddShoppingListItems 
                     products={products!}
                     handleAddShoppingListItem={handleAddShoppingListItem}
                     ></AddShoppingListItems>
                     <ShoppingListItems
                     rows={shoppingListStore!.addShoppingListFormData.shoppingListItems}
                     />
                  </DialogContent>
                  <DialogActions >
                    <Button onClick={handleClose} color="primary" aria-label="cancel" >
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
        </Dialog></div>
    
    </Toolbar>
  );
};

export default inject("shoppingListStore")(observer(ShoppinglistsToolbar));
 /* <Fab className={classes.fab} color="primary" aria-label="add">
        <AddIcon />
      </Fab>*/