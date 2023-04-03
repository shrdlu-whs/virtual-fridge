import React from "react";
import { inject, observer } from "mobx-react";
import { UiStateStore } from "../../store/uiStateStore";
import { AccountStore } from "../../store/accountStore";
import { ProductStore } from "../../store/productStore";
import { CategoryStore } from "../../store/categoryStore";
import { IApiProduct } from "../../interfaces/api/api-product.interface";
import ProductCards from "./productCards/productCards";
import AddProductForm from "./addProductForm/addProductForm";
import ProductView from "./productView/productView";

interface IProductCardsContainerProps {
  uiStateStore?: UiStateStore;
  accountStore?: AccountStore;
  productStore?: ProductStore;
  categoryStore?: CategoryStore;
}

const ProductCardsContainer = ({
  uiStateStore,
  accountStore,
  productStore,
  categoryStore,
}: IProductCardsContainerProps) => {
  React.useEffect(() => {
    productStore!.getProducts();
    categoryStore!.getCategories();
  }, []);

  const handleAddProductForm = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    uiStateStore!.setAddProductViewOpen(true);
  };

  const handleDeleteProduct = (id: number) => {
    productStore?.deleteProduct(id);
  };

  const handleShowFullProduct = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {};

  const handleAddProduct = (product: IApiProduct) => {
    productStore!
      .addProduct(product)
      .then(() => uiStateStore!.setAddProductViewOpen(false));
  };

  const handleAddProductCancel = () => {
    uiStateStore!.setAddProductViewOpen(false);
  };

  const handleAddProductQuantity = (product: IApiProduct) => {
    product.totalQuantity = product.totalQuantity + 1;
    productStore!.updateProduct(product);
  };

  const handleRemoveProductQuantity = (product: IApiProduct) => {
    product.totalQuantity = product.totalQuantity - 1;
    productStore!.updateProduct(product);
  };

  const handleShowProduct = (product: IApiProduct) => {
    productStore!.resetAddProductFormData();
    uiStateStore!.setProductViewOpen(true);
    productStore!.setActiveProduct(product);
  };

  const handleReturnToOverview = () => {
    uiStateStore!.setProductViewOpen(false);
  };

  return (
    <>
      {uiStateStore!.isProductViewOpen ? (
        <ProductView handleReturnToOverview={handleReturnToOverview} />
      ) : uiStateStore!.isAddProductViewOpen ? (
        <AddProductForm
          isSubmitting={uiStateStore!.isSubmitting}
          isMobile={uiStateStore!.isMobile}
          handleAddProduct={handleAddProduct}
          handleAddProductCancel={handleAddProductCancel}
        />
      ) : (
        <ProductCards
          handleAddProduct={handleAddProductForm}
          handleDeleteProduct={handleDeleteProduct}
          handleAddProductQuantity={handleAddProductQuantity}
          handleRemoveProductQuantity={handleRemoveProductQuantity}
          handleShowProduct={handleShowProduct}
          products={productStore!.products}
          isMobile={uiStateStore!.isMobile}
        />
      )}
    </>
  );
};

export default inject(
  "uiStateStore",
  "accountStore",
  "productStore",
  "categoryStore"
)(observer(ProductCardsContainer));
