import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useStyles } from "./ironStock.styles";
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
import { Order, getComparator, stableSort } from "../../../utils/sort.utils";
import IronStockHeader from "./ironStockHeader/ironStockHeader";
import IronStockToolbar from "./ironStockToobar/ironStockToobar";
import { IIronStockProduct } from "../../../interfaces/ironStockProduct.interface";
import { observer } from "mobx-react";
import { TextField } from "@material-ui/core";

interface IEditingRow {
  id: number;
  oldValue: number;
}

interface IIronStockProps {
  rows: IIronStockProduct[];
  isMobile: boolean;
  handleAddProduct: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleDeleteProducts: (ids: number[]) => void;
  handleUpdateProduct: (id: number, ironStock: number) => void;
  handleSaveProducts: (ids: number[]) => void;
}

const IronStock = ({ rows, isMobile, handleAddProduct, handleDeleteProducts, handleUpdateProduct, handleSaveProducts }: IIronStockProps) => {
  //#region Props
  const { t } = useTranslation();
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof IIronStockProduct>("ironStock");
  const [selected, setSelected] = React.useState<number[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedRows, setEditedRows] = React.useState<IEditingRow[]>([]);
  const [filteredRows, setFilteredRows] = React.useState<IIronStockProduct[]>([]);
  //#endregion

  //#region Refresh rows
  const updateSelectedRows = (rows: IIronStockProduct[]) => {
    const newSelectedIds = rows.filter((n) => selected.find((sel) => sel === n.id)).map((product) => product.id);
    setSelected(newSelectedIds);
  };

  const updateEditedRows = (rows: IIronStockProduct[]) => {
    const refreshedIds = rows.filter((n) => editedRows.find((e) => e.id === n.id)).map((product) => product.id);
    const newEditedRows = editedRows.filter((e) => refreshedIds.find((p) => p == e.id));
    setEditedRows(newEditedRows);
  };
  //#endregion

  //#region State transfer
  useEffect(() => {
    // The observers rows state can´t set directly (donßt know why, maybe because its an proxy object) - instead set the rows
    setFilteredRows(rows);
    updateSelectedRows(rows);
    // Update editing data, if the dataset reloads, while editing
    updateEditedRows(rows);
    // Remember the rows, to prevent rerendering the same object
    //  1 => rows.length = 0      // Because of async --- we will rerender after the component did mount
    //  2 => rows.length => 5
    //  without remember: 3 => rows.length => 5
    //)
  }, [rows]);
  //#endregion

  //#region Filtering
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = event.target.value;
    const newFilteredRwos = rows.filter((row) => row.name.toLowerCase().includes(newVal));
    setFilteredRows(newFilteredRwos);
    updateSelectedRows(newFilteredRwos);
  };
  //#endregion

  //#region Row editing
  const handleEditProduct = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsEditing(true);
  };

  const handleEditProductChange = (row: IIronStockProduct, value: number) => {
    // save old values - don´t update old values
    const sRow = editedRows.find((r) => r.id === row.id);
    if (!sRow) {
      const editedRow: IEditingRow = { id: row.id, oldValue: row.ironStock };
      setEditedRows(editedRows.concat([editedRow]));
    }
    handleUpdateProduct(row.id, value);
  };

  const handleCancelEdit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    editedRows.map((p) => {
      handleUpdateProduct(p.id, p.oldValue);
    });
    setEditedRows([]);
    setIsEditing(false);
  };

  const handleSaveEdit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const ids = editedRows.map((p) => p.id);
    handleSaveProducts(ids);
    setEditedRows([]);
    setIsEditing(false);
  };

  //#endregion

  //#region Table basic functions

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof IIronStockProduct) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = filteredRows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleRowClick = (event: React.MouseEvent<unknown>, id: number) => {
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

  const isSelected = (id: number) => !isEditing && selected.indexOf(id) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredRows.length - page * rowsPerPage);

  //#endregion

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <IronStockToolbar
          handleSearch={handleSearch}
          handleAddProduct={handleAddProduct}
          handleEditProduct={handleEditProduct}
          handleCancelEdit={handleCancelEdit}
          handleSaveEdit={handleSaveEdit}
          handleDeleteProducts={() => handleDeleteProducts(selected)}
          numSelected={selected.length}
          isEditing={isEditing}
          isMobile={isMobile}
        />
        <TableContainer>
          <Table className={classes.table} aria-labelledby="tableTitle" size={dense ? "small" : "medium"} aria-label="enhanced table">
            <IronStockHeader
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={filteredRows.length}
              isEditing={isEditing}
            />
            <TableBody>
              {(!isEditing ? stableSort(filteredRows, getComparator(order, orderBy)) : filteredRows)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => {
                        if (!isEditing) handleRowClick(event, row.id);
                      }}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      {!isEditing && (
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} inputProps={{ "aria-labelledby": labelId }} />
                        </TableCell>
                      )}
                      <TableCell component="th" id={labelId} scope="row" padding={isEditing ? "default" : "none"}>
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.stock}</TableCell>
                      <TableCell align="right">
                        {isEditing ? (
                          <TextField
                            type="number"
                            variant="standard"
                            value={row.ironStock}
                            onChange={(evt) => handleEditProductChange(row, parseInt(evt.currentTarget.value))}
                            margin="none"
                            inputProps={{ min: 1 }}
                          />
                        ) : (
                          row.ironStock
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? (isEditing ? 45 : 33) : isEditing ? 65 : 53) * emptyRows }}>
                  <TableCell colSpan={4} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
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

export default observer(IronStock);
