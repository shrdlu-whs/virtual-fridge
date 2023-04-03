import React from "react";
import { inject, observer } from "mobx-react";
import IronStock from "./ironStockTable/ironStock";
import AddProductDialog from "./ironStockProduct/addProductDialog";
import { UiStateStore } from "../../store/uiStateStore";
import { IIronStockProduct } from "../../interfaces/ironStockProduct.interface";
import { ProductStore } from "../../store/productStore";

interface IIronStockContainerProps {
  uiStateStore?: UiStateStore;
  productStore?: ProductStore;
}

const IronStockContainer = ({ uiStateStore, productStore }: IIronStockContainerProps) => {
  const { ironStockProducts, missingIronStockProducts } = productStore!;
  const { isLoading } = uiStateStore!;

  React.useEffect(() => {
    if (!isLoading) {
      productStore!.getIronStockProducts();
    }
  }, [ironStockProducts, missingIronStockProducts ]);

  //#region Add product dialog
  const handleOpenProductDialog = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // Fetch data and then open the dialog
    productStore!.getIronStockProducts().then(() => uiStateStore!.setIronStockDialogOpen(true));
  };

  const handleAddProduct = (product: IIronStockProduct) => {
    // Update data and then close the dialog
    productStore!.addIronStockProduct(product).then(() => uiStateStore!.setIronStockDialogOpen(false));
  };

  const handleAddProductCancel = () => {
    uiStateStore!.setIronStockDialogOpen(false);
  };
  //#endregion

  //#region Row editing
  const handleUpdateProduct = (id: number, ironStock: number) => {
    // Update data, but don´t save - only if save icon clicked
    productStore!.updateCachedIronStockProduct(id, ironStock);
  };

  const handleSaveProducts = (ids: number[]) => {
    // Save data
    productStore!.updateIronStockProducts(ids);
  };
  //#endregion

  //#region Row deleting
  const handleDeleteProducts = (ids: number[]) => {
    for (const id of ids) {
      productStore!.deleteIronStockProduct(id);
    }
  };
  //#endregion

  return (
    <>
      <AddProductDialog
        products={missingIronStockProducts}
        isSubmitting={uiStateStore!.isSubmitting}
        openAddProductDialog={uiStateStore!.isIronStockDialogOpen}
        handleAddProduct={handleAddProduct}
        handleAddProductCancel={handleAddProductCancel}
      />
      <IronStock
        rows={ironStockProducts}
        isMobile={uiStateStore!.isMobile}
        handleAddProduct={handleOpenProductDialog}
        handleDeleteProducts={handleDeleteProducts}
        handleUpdateProduct={handleUpdateProduct}
        handleSaveProducts={handleSaveProducts}
      />
    </>
  );
};

export default inject("uiStateStore", "productStore")(observer(IronStockContainer));
