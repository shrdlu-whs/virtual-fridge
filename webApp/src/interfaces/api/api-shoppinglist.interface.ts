import { IApiShoppinglistItem } from './api-shoppinglistItem.interface'
import { IAddShoppinglistItem } from './api-shoppinglistItem.interface'
import { IUpdateShoppinglistItem } from './api-shoppinglistItem.interface'

export interface IApiShoppingList {
  id: number; 
  name: string;
  shoppingListItems: IApiShoppinglistItem[];
  created: Date;
}
export interface IAddShoppingList {
  name: string;
  shoppingListItems: IAddShoppinglistItem[];
  created: Date;
}
export interface IUpdateShoppingList {
  id?: number;
  name: string;
  shoppingListItems: IUpdateShoppinglistItem[];
  created: Date;
}
