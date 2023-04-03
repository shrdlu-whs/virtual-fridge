import React from "react";
import { inject, observer } from "mobx-react";
import GroceryList from "./groceryList";
import { UiStateStore } from "../../store/uiStateStore";
import { AccountStore } from "../../store/accountStore";
import { ShoppingListStore } from "../../store/shoppinglistStore";
import { useParams } from "react-router";
import { ProductStore } from "../../store/productStore";
import { runInAction } from "mobx";
import { IAddShoppinglistItem } from "../../interfaces/api/api-shoppinglistItem.interface";
import { IApiShoppingList } from "../../interfaces/api/api-shoppinglist.interface";
import { isNumber } from "@material-ui/data-grid";

interface IGrocerylistContainerProps {
  uiStateStore?: UiStateStore;
  accountStore?: AccountStore;
  shoppingListStore?: ShoppingListStore;
  productStore?: ProductStore;
}

const GrocerylistContainerContainer = ({
  uiStateStore,
  accountStore,
  shoppingListStore,
  productStore,
}: IGrocerylistContainerProps) => {
  const { isLoading } = uiStateStore!;
  const { id } = useParams<{ id: string }>();
  console.log(shoppingListStore!.activeShoppinglist);
  const list = shoppingListStore!.activeShoppinglist;
  console.log(shoppingListStore!.addShoppingListFormData);
  console.log({ id });
  React.useEffect(() => {
    if (!uiStateStore!.isLoading) {
      shoppingListStore!
        .getShoppinglist(parseInt(id))
        .then(() => console.log(shoppingListStore!.activeShoppinglist!.shoppingListItems));

      productStore!.getProducts().then(() => console.log(productStore!.products));
    }
  },[] );

  const handleOpenAddShoppingListForm = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    productStore!.getProducts().then(() => uiStateStore!.setShoppingListDialogOpen(true));
  };

  const handleUpdateShoppingList = (shoppingList: IApiShoppingList) => {
    shoppingListStore!.updateShoppingList(shoppingList);
  };

  const handleUpdateShoppingListItems = (id: number, quantity: number) => {
    console.log(quantity);
    if(isNumber(quantity) && !isNaN(quantity)){
      shoppingListStore!.updateCachedShoppingListItem(id, quantity);
    }
  };
  const handleDeleteShoppingListItems = (ids: number[]) => {
    for (let f = 0; f < ids.length; f++) {
      for (let i = list!.shoppingListItems.length - 1; i >= 0; i--) {
        console.log(list!.shoppingListItems[i]);
        console.log(ids[f]);
        console.log(list!.shoppingListItems[i].id);
        if (list!.shoppingListItems[i].id === ids[f]) {
          list!.shoppingListItems.splice(i, 1);
        }
      }
    }
    handleUpdateShoppingList(list!);
  };

  return (
    <>
      <GroceryList
        handleUpdateShoppingList={handleUpdateShoppingList}
        handleOpenAddShoppingListForm={handleOpenAddShoppingListForm}
        handleDeleteShoppingListItems={handleDeleteShoppingListItems}
        handleUpdateShoppingListItems={handleUpdateShoppingListItems}
        isMobile={uiStateStore!.isMobile}
        isSubmitting={uiStateStore!.isSubmitting}
        list={list!}
        rows={shoppingListStore!.activeShoppinglist?.shoppingListItems}
        products={productStore!.products}
      />
    </>
  );
};

export default inject(
  "uiStateStore",
  "accountStore",
  "shoppingListStore",
  "productStore"
)(observer(GrocerylistContainerContainer));
