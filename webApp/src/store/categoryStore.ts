/* eslint-disable no-debugger */
import { makeObservable, action, observable, runInAction } from "mobx";
import { RootStore } from "./rootStore";
import { persist } from "mobx-persist";
import { IApiCategory } from "../interfaces/api/api-category.interface";
import { getCategories } from "../services/category2.service";

export class CategoryStore {
  @observable categories: IApiCategory[] = [];

  constructor(private rootStore: RootStore) {
    makeObservable(this);
  }

  async getCategories() {
    try {
      const categories = (await getCategories()).category;
      this.setCategories(categories);
    } catch (error) {
      if (error.message) {
        this.rootStore.notificationStore.createNotification("get_categories", "error", true, error);
      }
    }
  }

  @action
  setCategories(categories: IApiCategory[]) {
    this.categories = categories;
  }
}
