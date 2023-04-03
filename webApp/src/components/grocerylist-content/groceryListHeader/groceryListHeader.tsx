import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useTranslation } from "react-i18next";
import { useStyles } from "./groceryListHeader.styles";
import { IGroceryListItem } from "../../../interfaces/grocerylist.interface"


interface HeadCell {
  disablePadding: boolean;
  id: keyof IGroceryListItem ;
  label: string;
  numeric: boolean;
}



interface GroceryListHeaderProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;  
  rowCount: number;
}

const GroceryListHeader = (props: GroceryListHeaderProps) => {
  const { t } = useTranslation();
  const headCells: HeadCell[] = [
    { id: "productname", numeric: false, disablePadding: true, label: t("Produktname") },
    { id: "quantity", numeric: true, disablePadding: false, label: t("Menge") },
    { id: "unit", numeric: false, disablePadding: false, label: t("Einheit") }
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
              <TableSortLabel>
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default GroceryListHeader;
