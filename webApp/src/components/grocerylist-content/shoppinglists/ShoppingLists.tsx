import React from "react";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
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
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { useTranslation } from "react-i18next";
import { useStyles } from "./ShoppingLists.styles";
import { Router } from "@material-ui/icons";
import ShoppinglistsToolbar from "./shoppingslistsToolbar/shoppinglistsToolbar";
import ShoppinglistsHeader from "./shoppinglistsHeader/shoppinglistsHeader";
import { useHistory } from "react-router-dom";
import { IApiShoppingList } from "../../../interfaces/api/api-shoppinglist.interface";
import { IAddShoppingList } from "../../../interfaces/api/api-shoppinglist.interface";
import { ShoppingListStore } from "../../../store/shoppinglistStore";
import { IApiProduct } from "../../../interfaces/api/api-product.interface";
import { inject, observer } from "mobx-react";

interface IShoppingListsProps {
  handleRedirect: (path: string) => void;
  shoppingListStore?: ShoppingListStore;
  products?: IApiProduct[];
  isMobile: boolean;
  isSubmitting: boolean;
  rows: IApiShoppingList[];
  handleAddShoppingList: (shoppingList: IAddShoppingList) => void;
  handleDeleteShoppingLists: (ids: number[]) => void;
  handleGetShoppingList: (shoppingList: IApiShoppingList) => void;
  //shoppinglist: IAddShoppingList;
}

const ShoppingLists = ({
  shoppingListStore,
  products,
  handleRedirect,
  isMobile,
  rows,
  isSubmitting,
  handleAddShoppingList,
  handleDeleteShoppingLists,
  handleGetShoppingList,
}: IShoppingListsProps) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();
  const [selected, setSelected] = React.useState<number[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [filteredRows, setFilteredRows] = React.useState<IApiShoppingList[]>([]);
  rows = rows ? rows : [];
  console.log(rows);

  const handleSubmit = (shoppinglist: IApiShoppingList, index: number) => {
    handleGetShoppingList(shoppinglist);
    history.push(`/grocerylist/${shoppinglist.id}`);
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

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = filteredRows.map((n) => n.id);
      setSelected(newSelecteds);

      return;
    }
    setSelected([]);
  };
  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    //console.log(handleGetShoppingList(id));
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

  const isSelected = (id: number) => selected.indexOf(id) !== -1;
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <ShoppinglistsToolbar
          isSubmitting={isSubmitting}
          isMobile={isMobile}
          products={products!}
          handleAddShoppingList={handleAddShoppingList}
          handleDeleteShoppingList={() => handleDeleteShoppingLists(selected)}
        ></ShoppinglistsToolbar>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <ShoppinglistsHeader
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
            />
            <TableBody>
              {rows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                // const isItemBuy = isSelected(row.isAcquired);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                        onClick={(event) => handleClick(event, row.id)}
                      />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.created}</TableCell>
                    <TableCell align="right">
                      <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        onClick={() => handleSubmit(row, index)}
                      >
                        Einkaufsliste anzeigen
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default inject("shoppingListStore")(observer(ShoppingLists));
