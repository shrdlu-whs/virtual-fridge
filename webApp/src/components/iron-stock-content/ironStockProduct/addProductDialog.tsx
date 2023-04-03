import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { useTranslation } from "react-i18next";
import { IIronStockProduct } from "../../../interfaces/ironStockProduct.interface";
import { Formik } from "formik";
import * as Yup from "yup";
import RequestButton from "../../request-button/requestButton";
import ExitToApp from "@material-ui/icons/ExitToApp";

interface IAddProductFormProps {
  products: IIronStockProduct[];
  isSubmitting: boolean;
  openAddProductDialog: boolean;
  handleAddProduct: (product: IIronStockProduct) => void;
  handleAddProductCancel: () => void;
}

export const AddProductForm = ({ products, isSubmitting, openAddProductDialog, handleAddProduct, handleAddProductCancel }: IAddProductFormProps) => {
  const { t } = useTranslation();

  const [activeProduct, setActiveProduct] = React.useState<IIronStockProduct>();

  useEffect(() => {
    const initialValue = products.length > 0 ? products[0] : undefined;
    setActiveProduct(initialValue)
  }, [products])

  const handleProductChange = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    const id = parseInt(event.target.value as string);
    const product = products.find((product) => product.id === id);
    setActiveProduct(product);
  };

  const handleIronStock = (ironStock: number) => {
    if (activeProduct) {
      activeProduct.ironStock = ironStock;
      handleAddProduct(activeProduct);
    }
  };

  return (
    <div>
      <Dialog open={openAddProductDialog} onClose={handleAddProductCancel} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{t("title.iron-stock-dialog-title")}</DialogTitle>
        <Formik
          initialValues={{ ironStock: 1 }}
          onSubmit={(values) => {
            handleIronStock(values.ironStock);
          }}
          validationSchema={Yup.object().shape({
            ironStock: Yup.number().min(1).required(t("label.no_valid_ironStock")),
          })}
        >
          {({ values, touched, errors, dirty, handleChange, handleBlur, handleSubmit, isValid }) => {
            return (
              <form onSubmit={handleSubmit}>
                <DialogContent>
                  <DialogContentText>{t("body.iron-stock-dialog-context")}</DialogContentText>
                  <div>
                    <InputLabel htmlFor="id">{t("label.iron-stock-product-name")}</InputLabel>
                    <Select
                      native
                      onChange={handleProductChange}
                      onBlur={handleBlur}
                      inputProps={{
                        name: "name",
                        id: "id",
                      }}
                      disabled={!activeProduct}
                      fullWidth
                    >
                      {products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ))}
                    </Select>
                    <TextField
                      label={t("label.iron-stock-product-stock")}
                      type="number"
                      variant="standard"
                      value={activeProduct ? activeProduct.stock : 0}
                      margin="normal"
                      fullWidth
                      disabled
                    />
                    <TextField
                      label={t("label.iron-stock-product-iron-stock")}
                      name="ironStock"
                      type="number"
                      variant="standard"
                      value={values.ironStock}
                      onChange={handleChange}
                      inputProps={{ min: 1 }}
                      onBlur={handleBlur}
                      helperText={touched.ironStock && errors.ironStock}
                      error={touched.ironStock && errors.ironStock !== undefined}
                      margin="normal"
                      fullWidth
                      disabled={!activeProduct}
                      required
                    />
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleAddProductCancel} color="primary">
                    {t("action.cancel")}
                  </Button>
                  <RequestButton
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                    loading={isSubmitting}
                    disabled={!touched || isSubmitting || (dirty && !isValid) || !activeProduct}
                    endIcon={<ExitToApp />}
                  >
                    {t("action.add")}
                  </RequestButton>
                </DialogActions>
              </form>
            );
          }}
        </Formik>
      </Dialog>
    </div>
  );
};

export default AddProductForm;
