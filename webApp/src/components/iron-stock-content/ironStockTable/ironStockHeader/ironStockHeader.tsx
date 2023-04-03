import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useTranslation } from "react-i18next";
import { Order } from "../../../../utils/sort.utils";
import { useStyles } from "./ironStockHeader.styles";
import { IIronStockProduct } from "../../../../interfaces/ironStockProduct.interface";

interface HeadCell {
  disablePadding: boolean;
  id: keyof IIronStockProduct;
  label: string;
  numeric: boolean;
}

interface IronStockHeaderProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof IIronStockProduct) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  isEditing: boolean;
}

const IronStockHeader = (props: IronStockHeaderProps) => {
  const { t } = useTranslation();
  const headCells: HeadCell[] = [
    { id: "name", numeric: false, disablePadding: true, label: t("label.iron_stock_table_product_header") },
    { id: "stock", numeric: true, disablePadding: false, label: t("label.iron_stock_table_stock_header") },
    { id: "ironStock", numeric: true, disablePadding: false, label: t("label.iron_stock_table_iron_stock_header") },
  ];

  const classes = useStyles();
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, isEditing } = props;
  const createSortHandler = (property: keyof IIronStockProduct) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  if(isEditing) {
    headCells[0].disablePadding = false
  }

  return (
    <TableHead>
      <TableRow>
        {!isEditing && (
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ "aria-label": "select all desserts" }}
            />
          </TableCell>
        )}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : "asc"} onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? <span className={classes.visuallyHidden}>{order === "desc" ? "sorted descending" : "sorted ascending"}</span> : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default IronStockHeader;
