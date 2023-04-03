import React from "react";
import { inject, observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import useStyles from "./navigationMenu.styles";
import clsx from "clsx";

interface INavigationMenuProps {
  open: boolean;
  toggleSidenav: () => void;
  handleRedirect: (path: string) => void;
}

const NavigationMenu = ({
  open,
  toggleSidenav,
  handleRedirect,
}: INavigationMenuProps) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <Drawer
      className={clsx(classes.drawer)}
      classes={{
        paper: classes.drawerPaper,
      }}
      variant="persistent"
      anchor="left"
      color="secondary"
      open={open}
    >
      <div className={clsx(classes.drawerHeader)}>
        <IconButton onClick={toggleSidenav}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem
          button
          key="products"
          selected={location.pathname === "/products"}
          onClick={() => handleRedirect("/products")}
        >
          <ListItemText primary={t("title.productsite")} />
        </ListItem>
        <ListItem
          button
          key="ironstock"
          selected={location.pathname === "/ironstock"}
          onClick={() => handleRedirect("/ironstock")}
        >
          <ListItemText primary={t("title.iron_stock_site")} />
        </ListItem>
        <ListItem
          button
          key="shopping"
          selected={location.pathname === "/shopping"}
          onClick={() => handleRedirect("/shopping")}
        >
          <ListItemText primary={t("title.grocery_list_site")} />
        </ListItem>
        <ListItem
          button
          key="recipes"
          selected={location.pathname === "/recipes"}
          onClick={() => handleRedirect("/recipes")}
        >
          <ListItemText primary={t("title.recipe_site")} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default NavigationMenu;
