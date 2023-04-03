import { inject, observer } from "mobx-react";
import React from "react";
import { SwipeableDrawer, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { UiStateStore } from "../../../store/uiStateStore";
import { AccountStore } from "../../../store/accountStore";
import { RouteStore } from "../../../store/routeStore";
import NavigationMenu from "./navigationMenu";

interface INavigationMenuContainerProps {
  uiStateStore?: UiStateStore;
  accountStore?: AccountStore;
  routeStore?: RouteStore;
}

const NavigationMenuContainer = ({
  uiStateStore,
  accountStore,
  routeStore
}: INavigationMenuContainerProps) => {

  const handleRedirect = (path: string) => {
    uiStateStore!.toggleSidenav();
    routeStore!.redirect(path);
  }

  return (
    <NavigationMenu 
    open={uiStateStore!.isSiteNavOpen}
    toggleSidenav={() => uiStateStore!.toggleSidenav()}
    handleRedirect={handleRedirect}
    />
  );
};

export default inject(
  "uiStateStore",
  "accountStore",
  "routeStore"
)(observer(NavigationMenuContainer));
