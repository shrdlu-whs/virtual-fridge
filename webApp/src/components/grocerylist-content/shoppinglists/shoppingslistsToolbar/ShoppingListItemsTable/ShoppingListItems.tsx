import React from 'react';
import { inject, observer } from "mobx-react";
import { useStyles } from './ShoppingListItems.styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { IAddShoppinglistItem } from '../../../../../interfaces/api/api-shoppinglistItem.interface'

interface IShoppingListItems {
    rows: IAddShoppinglistItem[];
}

const ShoppingListItems = ({ rows }: IShoppingListItems) => {

    const classes = useStyles();
    return (
        <TableContainer className={classes.container}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Produkt
                   </TableCell>
                        <TableCell align="right">
                            Menge
                   </TableCell>
                        <TableCell align="left">
                            Einheit
                   </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) =>
                        <TableRow key="row.product.id">
                            <TableCell>
                                {row.product.name}
                            </TableCell>
                            <TableCell align="right">
                                {row.quantity}
                            </TableCell>
                            <TableCell align="left">
                                {row.product.unit}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
export default observer(ShoppingListItems);