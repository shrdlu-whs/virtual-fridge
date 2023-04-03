import { makeObservable, action, observable, runInAction } from "mobx";
import { persist } from "mobx-persist";
import { IApiShoppingList, IUpdateShoppingList } from '../interfaces/api/api-shoppinglist.interface';

import { IAddShoppingList } from '../interfaces/api/api-shoppinglist.interface';
import { RootStore } from "./rootStore";
import { getShoppingLists, getShoppingList, addShoppingList, updateShoppingList, deleteShoppingList } from '../services/shoppingList2.service'
import { IAddShoppinglistItem } from "../interfaces/api/api-shoppinglistItem.interface";

export class ShoppingListStore {
    @observable activeShoppinglist: IApiShoppingList | undefined = undefined;
    @observable shoppingLists: IApiShoppingList[] = [];
    @observable shoppingList: IAddShoppingList[] = [];
 
    @observable shoppingListsItems: IAddShoppinglistItem[] = [];
    @observable addShoppingListFormData: IAddShoppingList = {
        name: "",
        shoppingListItems: this.shoppingListsItems,
        created: new Date()
    };
    constructor(private rootStore: RootStore) {
        makeObservable(this);
    }
    async getShoppinglists() {
        try {
            this.rootStore.uiStateStore.setLoading(true);
            const shoppinglists = (await getShoppingLists()).shoppingLists;
            this.setShoppingLists(shoppinglists);
            console.log(shoppinglists);
            console.log(this.addShoppingListFormData);
        } catch (error) {
            this.rootStore.notificationStore.createNotification("get_shoppinglists", "error", true, error);
        } finally {
            this.rootStore.uiStateStore.setLoading(false);
        }
    }
    async getShoppinglist(id: number) {
        try {
            this.rootStore.uiStateStore.setLoading(true);
            const shoppinglist = (await getShoppingList(id)).shoppingList;
            this.setActiveShoppingList(shoppinglist);
            this.updateCachedShoppingLists(shoppinglist);
            console.log(this.activeShoppinglist);
        } catch (error) {
            this.rootStore.notificationStore.createNotification("get_shoppinglist", "error", true, error);
        } finally {
            this.rootStore.uiStateStore.setLoading(false);
        }
    }
    async addShoppingList(shoppinglist: IAddShoppingList) {
        try {
            this.rootStore.uiStateStore.setLoading(true);
            shoppinglist = (await addShoppingList(shoppinglist)).createShoppingList;
            this.setShoppingList(this.shoppingList.concat([shoppinglist]));
        } catch (error) {
            this.rootStore.notificationStore.createNotification("add_shoppinglist", "error", true, error);
        } finally {
            this.rootStore.uiStateStore.setLoading(false);
        }
    }
    
    async updateShoppingList(shoppinglist: IUpdateShoppingList) {
        try {
            this.rootStore.uiStateStore.setLoading(true);
            await updateShoppingList(shoppinglist);
        } catch (error) {
            this.rootStore.notificationStore.createNotification("update_shoppinglist", "error", true, error);
        } finally {
            this.rootStore.uiStateStore.setLoading(false);
        }

    }

    async deleteShoppingList(id: number) {
        try {
            this.rootStore.uiStateStore.setLoading(true);
            await deleteShoppingList(id);
            const index = this.shoppingLists.findIndex((shoppingList) => shoppingList.id === id);
            if (index !== -1) {
                runInAction(() => {
                    this.shoppingLists.splice(index, 1);
                })
            }
        } catch (error) {
            this.rootStore.notificationStore.createNotification("delete_shoppinglist", "error", true, error);
        } finally {
            this.rootStore.uiStateStore.setLoading(false);
        }
    }

    @action
    updateCachedShoppingLists(shoppinglist: IApiShoppingList) {
        const index = this.shoppingLists.findIndex((sShoppingList) => sShoppingList.id === shoppinglist.id);
        if (index !== -1) {
            this.shoppingLists.splice(index, 1, shoppinglist);
        } else {
            this.shoppingLists.push(shoppinglist);
        }
    }

    @action
    updateCachedShoppingListItem(id: number, quantity: number) {
        const shoppingListItem = this.activeShoppinglist?.shoppingListItems.find((i) =>i.id === id);
       console.log(shoppingListItem);
       console.log(quantity);
        if(shoppingListItem) {
            shoppingListItem!.quantity = quantity;
            console.log(shoppingListItem);
        }
        updateShoppingList(this.activeShoppinglist!);
    }

    @action
    setShoppingList(shoppinglist: IAddShoppingList[]) {
        this.shoppingList = shoppinglist;
    }
    @action
    setShoppingLists(shoppinglists: IApiShoppingList[]) {
        this.shoppingLists = shoppinglists;
    }

    @action
    setActiveShoppingList(shoppinglist: IApiShoppingList) {
        this.activeShoppinglist = shoppinglist;
    }

    @action
    setShoppingListItems(items: IAddShoppinglistItem[]) {
        this.shoppingListsItems = items;
    }
  
    @action
    resetAddShoppingListFormData() {
        this.setShoppingListItems([]);
        this.setAddShoppingListFormData({
            name: "",
            shoppingListItems: this.shoppingListsItems,
            created: new Date()
        });
    }

    @action 
    setAddShoppingListFormData(data: IAddShoppingList) {
        this.addShoppingListFormData = data;
    }
}