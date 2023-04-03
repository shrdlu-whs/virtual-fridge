import { UiStateStore } from "./uiStateStore";
import { AccountStore } from "./accountStore";
import { RouteStore } from "./routeStore";
import { SettingStore } from "./settingStore";
import { NotificationStore } from "./notificationStore"
import { ProductStore } from "./productStore"
import { RecipeStore } from "./recipeStore"
import { ShoppingListStore } from "./shoppinglistStore"
import { CategoryStore } from "./categoryStore";


export class RootStore {
  uiStateStore: UiStateStore;
  accountStore: AccountStore;
  routeStore: RouteStore;
  notificationStore: NotificationStore;
  settingStore: SettingStore;
  productStore: ProductStore;
  recipeStore: RecipeStore;
  shoppingListStore: ShoppingListStore;
  categoryStore: CategoryStore;

  constructor() {
    this.uiStateStore = new UiStateStore(this);
    this.accountStore = new AccountStore(this);
    this.routeStore = new RouteStore(this);
    this.notificationStore = new NotificationStore(this);
    this.settingStore = new SettingStore(this);
    this.productStore = new ProductStore(this);
    this.recipeStore = new RecipeStore(this);
    this.shoppingListStore = new ShoppingListStore(this);
    this.categoryStore = new CategoryStore(this);
  }
}
