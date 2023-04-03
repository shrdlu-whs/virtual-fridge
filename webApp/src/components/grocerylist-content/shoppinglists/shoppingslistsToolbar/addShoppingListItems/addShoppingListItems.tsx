import React from "react";
import { IApiProduct } from '../../../../../interfaces/api/api-product.interface';
import { Select, Grid, IconButton, Paper, Toolbar, Tooltip, Typography, TextField, InputLabel } from "@material-ui/core";
import { useStyles} from './addShoppingListItems.styles'
import { inject, observer } from "mobx-react";
import AddIcon from "@material-ui/icons/Add";
import { IAddShoppinglistItem } from "../../../../../interfaces/api/api-shoppinglistItem.interface";
import { ShoppingListStore } from "../../../../../store/shoppinglistStore";
import { runInAction } from "mobx";


interface IAddShoppingListItems {
    products?: IApiProduct[];
    shoppingListStore?: ShoppingListStore;
    handleAddShoppingListItem: (shoppinglistItem: IAddShoppinglistItem) => void;
}

const AddShoppingListItems = ({
    products,
    shoppingListStore,
    handleAddShoppingListItem
}: IAddShoppingListItems) => {
    const classes = useStyles();
    const [activeProduct, setActiveProduct] = React.useState<IApiProduct>();
    const [quantity, setQuantity] = React.useState(1);

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

    const handleAddProduct = () => {
        if(activeProduct && quantity) {
            const shoppingListProduct: IAddShoppinglistItem = {
                product: activeProduct,
                quantity: quantity,
                isAcquired: false
            };
           
           handleAddShoppingListItem(shoppingListProduct);
        }
        

    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <InputLabel htmlFor="id">Produktname</InputLabel>
                <Select
                    className={classes.select}
                    onChange={handleProductChange}
                    label="Produkt"
                >
                    {products!.map((product) => (
                        <option
                            key={product!.id}
                            value={product!.id}>{product!.name}
                        </option>
                    ))}
                </Select>
            </Grid>
            <Grid item xs={3}>
            <TextField
                          id="standard-number"
                          type="number"
                          name="quantity"
                          label="Menge"
                          value={quantity}
                          onChange={(evt) => setQuantity(parseInt(evt.currentTarget.value))}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        
                        />
            </Grid>
            <Grid item xs={3}>
        <IconButton onClick={handleAddProduct}>
          <AddIcon />
        </IconButton>
        </Grid>
        </Grid>
    );
};

export default inject("shoppingListStore") (observer(AddShoppingListItems));