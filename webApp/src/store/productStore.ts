/* eslint-disable no-debugger */
import { makeObservable, action, observable, runInAction } from "mobx";
import { RootStore } from "./rootStore";
import { persist } from "mobx-persist";
import { IApiProduct } from "../interfaces/api/api-product.interface";
import { IIronStockProduct } from "../interfaces/ironStockProduct.interface";
import { getProducts, getProduct, addProduct, updateProduct, deleteProduct } from "../services/product2.service";
import { IApiCategory } from "../interfaces/api/api-category.interface";
import { INutritionValue, IProductItem, IProduct } from "../interfaces/froms/addProductForm.interface";
import { EMPTY_OBJECT } from "mobx/dist/internal";

export class ProductStore {

  nutritionValueEmpty: INutritionValue = {
    calories: 0,
    carbohydrates: 0,
    fat: 0,
    fiber: 0,
    nutritionScore: "A",
    protein: 0,
    salt: 0,
    saturatedFat: 0,
    sugar: 0
  };

  @observable activeProduct: IApiProduct | undefined = undefined;
  @observable products: IApiProduct[] = [];
  @observable ironStockProducts: IIronStockProduct[] = [];
  @observable missingIronStockProducts: IIronStockProduct[] = [];
  @observable productItems: IProductItem[] = [];

  @observable addProductFormData: IProduct = {
    name: "",
    iconPath: "",
    category: [],
    totalQuantity: 1,
    minQuantity: -1,
    unit: "",
    items: this.productItems,
    nutritionalValue: this.nutritionValueEmpty
  };

  constructor(private rootStore: RootStore) {
    makeObservable(this);
  }

  async getProducts() {
    try {
      // const products = (await getProducts(this.rootStore.accountStore.generateCancelToken())).data;
      this.rootStore.uiStateStore.setLoading(true);
      const products = (await getProducts()).products;
      this.setProducts(products);
    } catch (error) {
      if (error.message) {
        this.rootStore.notificationStore.createNotification("get_products", "error", true, error);
      }
    } finally {
      this.rootStore.uiStateStore.setLoading(false);
    }
  }

  async getProduct(id: number) {
    try {
      this.rootStore.uiStateStore.setLoading(true);
      // const product = (await getProduct(id, this.rootStore.accountStore.generateCancelToken())).data;
      const product = (await getProduct(id)).product;
      this.setActiveProduct(product);
      this.updateCachedProducts(product);
    } catch (error) {
      if (error.message) {
        this.rootStore.notificationStore.createNotification("get_product", "error", true, error);
      }
    } finally {
      this.rootStore.uiStateStore.setLoading(false);
    }
  }

  async addProduct(product: IApiProduct) {
    try {
      this.rootStore.uiStateStore.setLoading(true);
      product = (await addProduct(product)).createProduct;
      this.setProducts(this.products.concat([product]));
    } catch (error) {
      console.log(error)
      this.rootStore.notificationStore.createNotification("add_product", "error", true, error);
    } finally {
      this.rootStore.uiStateStore.setLoading(false);
    }
  }

  async updateProduct(product: IApiProduct) {
    try {
      this.rootStore.uiStateStore.setLoading(true);
      await updateProduct(product);
      if (product.id) this.updateCachedProducts(product);
    } catch (error) {
      this.rootStore.notificationStore.createNotification("update_product", "error", true, error);
    } finally {
      this.rootStore.uiStateStore.setLoading(false);
    }
  }

  async deleteProduct(id: number) {
    try {
      this.rootStore.uiStateStore.setLoading(true);
      await deleteProduct(id);
      const index = this.products.findIndex((product) => product.id === id);
      if (index !== -1) {
        runInAction(() => {
          this.products.splice(index, 1);
        });
      }
    } catch (error) {
      this.rootStore.notificationStore.createNotification("delete_product", "error", true, error);
    } finally {
      this.rootStore.uiStateStore.setLoading(false);
    }
  }

  @action
  updateCachedProducts(product: IApiProduct) {
    // Update cached products
    const index = this.products.findIndex((sProduct) => sProduct.id === product.id);
    if (index !== -1) {
      this.products.splice(index, 1, product);
    } else {
      this.products.push(product);
    }
  }

  async getIronStockProducts() {
    try {
      const products = (await getProducts()).products;
      this.rootStore.uiStateStore.setLoading(true);
      this.setProducts(products);
      const ironStockProducts = products.map(
        (product): IIronStockProduct => {
          return { id: product.id!, name: product.name, stock: product.totalQuantity, ironStock: product.minQuantity };
        }
      );
      this.setIronStockProducts(ironStockProducts.filter((product) => product.ironStock >= 0));
      this.setMissingIronStockProducts(ironStockProducts.filter((product) => product.ironStock < 0));
    } catch (error) {
      if (error.message) {
        this.rootStore.notificationStore.createNotification("get_products", "error", true, error);
      }
    } finally {
      this.rootStore.uiStateStore.setLoading(false);
    }
  }

  async addIronStockProduct(ironStockProduct: IIronStockProduct) {
    try {
      this.rootStore.uiStateStore.setLoading(true);
      const cachedProduct = this.products.find((sProduct) => sProduct.id === ironStockProduct.id)!;
      cachedProduct.minQuantity = ironStockProduct.ironStock;
      await updateProduct(cachedProduct);
      this.setIronStockProducts(this.ironStockProducts.concat([ironStockProduct]));
    } catch (error) {
      this.rootStore.notificationStore.createNotification("update_product", "error", true, error);
    } finally {
      this.rootStore.uiStateStore.setLoading(false);
    }
  }

  async updateIronStockProducts(ids: number[]) {
    try {
      this.rootStore.uiStateStore.setLoading(true);
      for (const id of ids) {
        const product = this.ironStockProducts.find((product) => product.id === id);
        if (product) {
          const cachedProduct = this.products.find((sProduct) => sProduct.id === product.id)!;
          cachedProduct.minQuantity = product.ironStock;
          await updateProduct(cachedProduct);
        }
      }
    } catch (error) {
      // Rollback ???
      this.rootStore.notificationStore.createNotification("update_product", "error", true, error);
    } finally {
      this.rootStore.uiStateStore.setLoading(false);
    }
  }

  @action
  updateCachedIronStockProduct(id: number, ironStock: number) {
    const ironStockProduct = this.ironStockProducts.find((product) => product.id === id);
    if (ironStockProduct) {
      ironStockProduct.ironStock = ironStock;
    }
  }

  @action
  async deleteIronStockProduct(id: number) {
    try {
      const cachedProduct = this.products.find((sProduct) => sProduct.id === id)!;
      cachedProduct.minQuantity = -1;
      await updateProduct(cachedProduct);
      this.setIronStockProducts(this.ironStockProducts.filter((product) => product.id !== id));
    } catch (error) {
      this.rootStore.notificationStore.createNotification("update_product", "error", true, error);
    }
  }

  @action
  setActiveProduct(product: IApiProduct) {
    this.activeProduct = product;
  }

  @action
  setProducts(products: IApiProduct[]) {
    this.products = products;
  }

  @action
  setIronStockProducts(ironStockProducts: IIronStockProduct[]) {
    this.ironStockProducts = ironStockProducts;
  }

  @action
  setMissingIronStockProducts(ironStockProducts: IIronStockProduct[]) {
    this.missingIronStockProducts = ironStockProducts;
  }

  @action
  setProductItems(items: IProductItem[]) {
    this.productItems = items;
  }

  @action
  setAddProductFormData(data: IProduct) {
    this.addProductFormData = data;
  }

  @action
  resetAddProductFormData = () => {
    this.setProductItems([]);
    this.setAddProductFormData({
      name: "",
      iconPath: "",
      category: [],
      totalQuantity: 1,
      minQuantity: -1,
      unit: "",
      items: this.productItems,
      nutritionalValue: this.nutritionValueEmpty
    });
  };
}
