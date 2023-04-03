import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useTranslation } from "react-i18next";
import { Order } from "../../../../../utils/sort.utils";
import { useStyles } from "./ingredientsHeader.styles";
import { IApiProduct } from "../../../../../interfaces/api/api-product.interface";
import { IApiRecipeItem } from "../../../../../interfaces/api/api-recipeItem.interface";

interface HeadCell {
  disablePadding: boolean;
  id: keyof IApiRecipeItem | keyof IApiProduct;
  label: string;
  numeric: boolean;
}

interface IngredientsHeaderProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

const IngredientsHeader = (props: IngredientsHeaderProps) => {
  const { t } = useTranslation();
  const headCells: HeadCell[] = [
    { id: "quantity", numeric: false, disablePadding: false, label: t("label.ingredients_table_quantity_header") },
    { id: "unit", numeric: false, disablePadding: false, label: t("label.ingredients_table_unit_header") },
    { id: "product", numeric: false, disablePadding: false, label: t("label.ingredients_table_product_header") },
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

export default IngredientsHeader;
