// Componente füür die Buttons, die öffnen neue Seite mit Tabelle von der Liste
import React from "react";
import { inject, observer } from "mobx-react";
import { UiStateStore } from "../../../store/uiStateStore"
import { AccountStore } from "../../../store/accountStore"
import { RouteStore } from "../../../store/routeStore"
import ShoppingLists from "./ShoppingLists"
import { ShoppingListStore } from "../../../store/shoppinglistStore";
import { IAddShoppingList, IApiShoppingList } from "../../../interfaces/api/api-shoppinglist.interface";
import { ProductStore } from "../../../store/productStore";



interface IShoppingListsContainerProps {
    uiStateStore?: UiStateStore;
    accountStore?: AccountStore;
    routeStore?: RouteStore;
    shoppingListStore?: ShoppingListStore;
    productStore?: ProductStore;
  }
  const ShoppingListsContainer= ({ 
    uiStateStore,
    accountStore,
    routeStore,
    shoppingListStore,
    productStore
  }: IShoppingListsContainerProps)  => {
  
    console.log(shoppingListStore!.addShoppingListFormData);
    React.useEffect(() => {
      if(!uiStateStore!.isLoading) {
        shoppingListStore!.getShoppinglists();
        productStore!.getProducts();
      }
    }, [shoppingListStore!.shoppingLists, productStore!.products]);

    const handleAddShoppingList = (shoppingList: IAddShoppingList) => {
      // Update data and then close the dialog
      shoppingListStore!.addShoppingList(shoppingList);
    };
  
    const handleDeleteShoppingLists = (ids: number[]) => {
      for (const id of ids) {
        shoppingListStore!.deleteShoppingList(id);
      }
    }


    const handleGetShoppingList = (shoppinglist: IApiShoppingList) => {
      shoppingListStore!.setActiveShoppingList(shoppinglist);

    }
  
    const handleRedirect = (path: string) => {
      routeStore!.redirect(path);
    }
    return (
      <ShoppingLists 
      handleRedirect={handleRedirect} 
      isSubmitting={uiStateStore!.isSubmitting}
      isMobile={uiStateStore!.isMobile}
      products={productStore!.products}
      rows={shoppingListStore!.shoppingLists}
      handleAddShoppingList={handleAddShoppingList}
      handleDeleteShoppingLists={handleDeleteShoppingLists}
      handleGetShoppingList={handleGetShoppingList}
      />
    );
  };
  
  export default inject(
    "uiStateStore",
    "accountStore",
    "routeStore",
    "shoppingListStore",
    "productStore"
  )(observer(ShoppingListsContainer));
  