import React, { ReactNode } from "react";
import { useLocation } from "react-router";
import { observer } from "mobx-react";
import { Box } from "@material-ui/core";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import NavigationMenuContainer from "./navigation-menu/navigationMenuContainer";
import { useStyles } from "./drawerWrapper.styles";

export const drawerWidth = 300;

type DrawerWrapperProps = {
  navMenuOpen: boolean;
  children: ReactNode;
};

const DrawerWrapper = ({ navMenuOpen, children }: DrawerWrapperProps) => {
  const classes = useStyles();

  return (
    <>
      <NavigationMenuContainer />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: navMenuOpen,
        })}
      >
        {children}
      </main>
    </>
  );
};

export default observer(DrawerWrapper);
