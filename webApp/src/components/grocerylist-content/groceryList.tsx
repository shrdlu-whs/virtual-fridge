import React, { useEffect } from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  Checkbox,
  TableRow,
  TablePagination,
  FormControlLabel,
  Switch,
  TextField,
  Select,
  MenuItem,
  Button,
  Dialog,
} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useTranslation } from "react-i18next";
import InputLabel from "@material-ui/core/InputLabel";
import { useStyles } from "./groceryList.styles";
import clsx from "clsx";
import { IGroceryListItem } from "../../interfaces/grocerylist.interface";
import { Order, getComparator, stableSort } from "../../utils/sort.utils";
import GroceryListToolbar from "./groceryListToolbar/groceryListToolbar";
import GroceryListHeader from "./groceryListHeader/groceryListHeader";
import { IApiShoppingList } from "../../interfaces/api/api-shoppinglist.interface";
import { IAddShoppinglistItem, IApiShoppinglistItem } from "../../interfaces/api/api-shoppinglistItem.interface";
import { IApiProduct } from "../../interfaces/api/api-product.interface";
import { ProductStore } from "../../store/productStore";
import { runInAction } from "mobx";
import { observer } from "mobx-react";

interface IEditingRow {
  id?: number;
  oldValue: number;
}
interface IGroceryListProps {
  // rows: IGroceryListItem[];
  handleUpdateShoppingList: (shoppingList: IApiShoppingList) => void;
  handleOpenAddShoppingListForm: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleDeleteShoppingListItems: (ids: number[]) => void;
  // handleOpenEdit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleUpdateShoppingListItems: (id: number, quantity: number) => void;
  isMobile: boolean;
  isSubmitting: boolean;
  list?: IApiShoppingList;
  rows?: IApiShoppinglistItem[];
  products?: IApiProduct[];
}

const GroceryList = ({
  handleUpdateShoppingList,
  handleOpenAddShoppingListForm,
  handleDeleteShoppingListItems,
  // handleOpenEdit,
  handleUpdateShoppingListItems,
  rows,
  isSubmitting,
  isMobile,
  list,
  products,
}: IGroceryListProps) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [selected, setSelected] = React.useState<number[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedRows, setEditedRows] = React.useState<IEditingRow[]>([]);

  rows = rows ? rows : [];

  const handleOpenEdit = () => {
    setIsEditing(true);
  };

  const handleEditChange = (row: IApiShoppinglistItem, quantity: number) => {
    const isEdited = editedRows.find((r) => r.id === row.id);
    console.log(editedRows);
    if (!isEdited) {
      const newEditedRow: IEditingRow = {
        id: row.id,
        oldValue: row.quantity,
      };
    }
    handleUpdateShoppingListItems(row.id!, quantity);
  };

  const handleCancelEdit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    editedRows.map((s) => {
      handleUpdateShoppingListItems(s.id!, s.oldValue);
    });
    setEditedRows([]);
    setIsEditing(false);
  };

  const handleSaveEdit = () => {
    setEditedRows([]);
    setIsEditing(false);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows!.map((n) => n.id!);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows!.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <GroceryListToolbar
          handleUpdateShoppingList={handleUpdateShoppingList}
          handleOpenAddShoppingListForm={handleOpenAddShoppingListForm}
          handleOpenEdit={handleOpenEdit}
          handleSaveEdit={handleSaveEdit}
          handleCancelEdit={handleCancelEdit}
          numSelected={selected.length}
          isMobile={isMobile}
          isEditing={isEditing}
          isSubmitting={isSubmitting}
          list={list}
          products={products}
          handleDeleteShoppingListItems={() => handleDeleteShoppingListItems(selected)}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <GroceryListHeader
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows!.length}
            />
            <TableBody>
              {rows!.map((row, index) => {
                const isItemSelected = isSelected(row.id!);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    onClick={(event) => {
                      if (!isEditing) handleClick(event, row.id!);
                    }}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.product.name}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                        onClick={(event) => handleClick(event, row.id!)}
                      />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      {row.product.name}
                    </TableCell>
                    <TableCell align="right">
                      {isEditing ? (
                        <TextField
                          type="number"
                          variant="standard"
                          value={row.quantity}
                          onChange={(evt) => handleEditChange(row, parseInt(evt.currentTarget.value))}
                          margin="none"
                          inputProps={{ min: 1 }}
                        />
                      ) : (
                        row.quantity
                      )}
                    </TableCell>
                    <TableCell>{row.product.unit}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows!.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" />
    </div>
  );
};

export default observer(GroceryList);
