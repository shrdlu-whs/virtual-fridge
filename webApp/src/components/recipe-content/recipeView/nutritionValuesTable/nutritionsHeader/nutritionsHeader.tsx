import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useTranslation } from "react-i18next";
import { Order } from "../../../../../utils/sort.utils";
import { useStyles } from "./nutritionsHeader.styles";
import { IApiNutritionValues } from "../../../../../interfaces/api/api-nutritionValues.interface";

interface HeadCell {
  disablePadding: boolean;
  id: "nutrition" | "quantity";
  label: string;
  numeric: boolean;
}

interface NutritionsHeaderProps {}

const NutritionsHeader = (props: NutritionsHeaderProps) => {
  const { t } = useTranslation();
  const headCells: HeadCell[] = [
    { id: "nutrition", numeric: false, disablePadding: false, label: t("label.nutrition_table_nutrition_header") },
    { id: "quantity", numeric: false, disablePadding: false, label: t("label.nutrition_table_quantity_header") },
  ];

  const classes = useStyles();

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.numeric ? "right" : "left"} padding={headCell.disablePadding ? "none" : "default"}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default NutritionsHeader;
