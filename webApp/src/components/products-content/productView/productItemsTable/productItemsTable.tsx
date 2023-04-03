import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useStyles } from "./productItemsTable.styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Switch from "@material-ui/core/Switch";
import { Order, getComparator, stableSort } from "../../../../utils/sort.utils";
import ProductItemsHeader from "./productItemsHeader/itemsHeader";
import ProductItemsToolbar from "./productItemsToolbar/itemsToolbar" 
import { observer } from "mobx-react";
import { ProductStore } from "../../../../store/productStore";
import { TextField } from "@material-ui/core";
import { IApiProduct } from "../../../../interfaces/api/api-product.interface";
import { IProductItem } from "../../../../interfaces/froms/addProductForm.interface";

interface IProductItemProps {
  rows: IProductItem[];
  isMobile: boolean;
  handleDeleteProductItems: (ids: string[]) => void;
  handleUpdateProductItems: (productItem: IProductItem, barcode: string, expiringDate: Date) => void;
}

const ProductItemsTable = ({ rows, isMobile, handleDeleteProductItems, handleUpdateProductItems }: IProductItemProps) => {
  //#region Props
  const { t } = useTranslation();
  const classes = useStyles();
  const [selected, setSelected] = React.useState<string[]>([]);
  const [dense, setDense] = React.useState(true);
  //#endregion

  const handleProductItemChange = (productItem: IProductItem, barcode: string, expiringDate: Date) => {
    handleUpdateProductItems(productItem, barcode, expiringDate);
  };

  //#region Table basic functions
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.uuid);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleRowClick = (event: React.MouseEvent<unknown>, uuid: string) => {
    const selectedIndex = selected.indexOf(uuid);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, uuid);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const isSelected = (uuid: string) => selected.indexOf(uuid) !== -1;
  //#endregion

  const emptyRows = 5 - rows.length > 0 ? 5 - rows.length : 0;

  return (
    <div className={classes.root}>
      <ProductItemsToolbar handleDeleteProductItems={() => handleDeleteProductItems(selected)} numSelected={selected.length} isMobile={isMobile} />
      <TableContainer>
        <Table className={classes.table} aria-labelledby="tableTitle" size={dense ? "small" : "medium"} aria-label="enhanced table">
          <ProductItemsHeader numSelected={selected.length} onSelectAllClick={handleSelectAllClick} rowCount={rows.length} />
          <TableBody>
            {rows.slice().map((row, index) => {
              const isItemSelected = isSelected(row.uuid);
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <TableRow hover aria-checked={isItemSelected} tabIndex={-1} key={row.uuid} selected={isItemSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox checked={isItemSelected} onClick={(event) => handleRowClick(event, row.uuid)} inputProps={{ "aria-labelledby": labelId }} />
                  </TableCell>
                  <TableCell component="th" id={labelId} scope="row" padding="none">
                    <TextField
                      type="number"
                      variant="standard"
                      value={row.barcode}
                      //onChange={(evt) => handleProductItemChange(row, parseInt(evt.currentTarget.value))}
                      margin="none"
                      inputProps={{ min: 1 }}
                    />
                  </TableCell>
                  <TableCell component="th" id={labelId} scope="row" padding="none">
                    {row.expirationDate}
                  </TableCell>                  
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow style={{ height: dense ? 33 * emptyRows : 65 * emptyRows }}>
                <TableCell colSpan={4} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default observer(ProductItemsTable);
