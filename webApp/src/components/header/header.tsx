import React from "react";
import { inject, observer } from "mobx-react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Typography, IconButton, Grid } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useTranslation } from "react-i18next";
import AccountContainer from "../account/accountMenuContainer";
import { useStyles } from "./header.styles";
import clsx from "clsx";

interface IHeaderProps {
  open: boolean;
  toggleSidenav: () => void;
  loggedIn: boolean;
}

const Header = ({ open, toggleSidenav, loggedIn }: IHeaderProps) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          {loggedIn && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleSidenav}
              className={clsx(classes.menuButton, { [classes.hide]: open })}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" className={classes.title}>
            {t("title.apptitle")}
          </Typography>
          <AccountContainer />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
