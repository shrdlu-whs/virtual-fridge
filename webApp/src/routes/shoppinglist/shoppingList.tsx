import * as React from "react";
import ShoppingListsContainer from "../../components/grocerylist-content/shoppinglists/shoppingListsContainer"
import { inject, observer } from "mobx-react";

interface IShoppingListsProps {}

const ShoppingLists = () => {
  return (
    <div>
      <ShoppingListsContainer />
    </div>
  );
};

export default observer(ShoppingLists);
