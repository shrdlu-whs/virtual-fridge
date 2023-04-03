import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useTranslation } from "react-i18next";
import { Order } from "../../../../../utils/sort.utils";
import { useStyles } from "./itemsHeader.styles";
import { IApiProduct } from "../../../../../interfaces/api/api-product.interface";
import { IApiItem } from "../../../../../interfaces/api/api-item.interface";

interface HeadCell {
  disablePadding: boolean;
  id: keyof IApiItem | keyof IApiProduct;
  label: string;
  numeric: boolean;
}

interface ProductItemsHeaderProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

const ProductItemsHeader = (props: ProductItemsHeaderProps) => {
  const { t } = useTranslation();
  const headCells: HeadCell[] = [
    { id: "barcode", numeric: false, disablePadding: false, label: t("label.productItem_table_barcode_header") },
    { id: "expirationDate", numeric: false, disablePadding: false, label: t("label.productItem_table_expiringDate_header") },
  ];

  const classes = useStyles();
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default ProductItemsHeader;
