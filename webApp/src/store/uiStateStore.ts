/* eslint-disable no-debugger */
import { makeObservable, action, observable } from "mobx";
import { RootStore } from "./rootStore";
import { persist } from "mobx-persist";
import { truncate } from "fs";

export class UiStateStore {
  // Initial false for authentication fetch on AWS
  @observable isInitiating: boolean = false;
  @observable fetchingUser: boolean = false;
  @observable isSubmitting: boolean = false;
  @observable accountMenuAnchor: HTMLElement | null = null;
  @observable isSiteNavOpen: boolean = false;
  @observable isMobile: boolean = false;
  @observable isIronStockDialogOpen: boolean = false;
  @observable isEditQuantityDialogOpen: boolean = false;
  @observable isEditQuanityDialogOpen: boolean = false;
  @observable isLoading: boolean = false;
  @observable isRecipeFormOpen: boolean = false;
  @observable isRecipeViewOpen: boolean = false;
  @observable isAddProductViewOpen: boolean = false;
  @observable isProductViewOpen: boolean = false;
  
  constructor(private rootStore: RootStore) {
    makeObservable(this);
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      // tablet
      this.isMobile = true;
    }
    if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
      // mobile
      this.isMobile = true;
    }
  }

  @action
  toggleSidenav() {
    this.isSiteNavOpen = !this.isSiteNavOpen;
  }

  @action
  setInitiated(init: boolean) {
    this.isInitiating = init;
  }

  @action
  setFetchingUser(fetching: boolean) {
    this.fetchingUser = fetching;
  }

  @action
  setSubmitting(submitting: boolean) {
    this.isSubmitting = submitting;
  }

  @action
  setAccountMenuAnchor(el: HTMLElement | null) {
    this.accountMenuAnchor = el;
  }

  @action
  setSiteNavOpen(open: boolean) {
    this.isSiteNavOpen = open;
  }

  @action
  setMobile(mobile: boolean) {
    this.isMobile = mobile;
  }

  @action
  setIronStockDialogOpen(open: boolean) {
    this.isIronStockDialogOpen = open;
  }

  @action
  setEditQuantityDialogOpen(open: boolean) {
    this.isEditQuantityDialogOpen = open;
  }

  @action
  setShoppingListDialogOpen(open: boolean) {
    this.isEditQuantityDialogOpen = open;
  }

  @action
  setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  @action
  setRecipeFormOpen(open: boolean) {
    this.isRecipeFormOpen = open;
  }

  @action
  setRecipeViewOpen(open: boolean) {
    this.isRecipeViewOpen = open;
  }

  @action
  setAddProductViewOpen(open: boolean){
    this.isAddProductViewOpen = open
  }

  @action
  setProductViewOpen(open: boolean) {
    this.isProductViewOpen = open;
  }
}


