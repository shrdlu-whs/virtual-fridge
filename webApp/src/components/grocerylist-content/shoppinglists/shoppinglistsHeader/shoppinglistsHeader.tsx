import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useTranslation } from "react-i18next";
import { useStyles } from "./shoppinglistsHeader.styles";


interface HeadCell {
  disablePadding: boolean;
  label: string;
  numeric: boolean;
}



interface ShoppingListsHeaderProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;  
  rowCount: number;
}

const ShoppingListsHeader = (props: ShoppingListsHeaderProps) => {
  const { t } = useTranslation();
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
          <TableCell align="left" padding="none">
              <TableSortLabel>
                  Name
            </TableSortLabel>
          </TableCell>
          <TableCell align="right" padding="default">
              <TableSortLabel>
                  Datum
            </TableSortLabel>
          </TableCell>
          <TableCell align="right" padding="none">
              
          </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default ShoppingListsHeader;