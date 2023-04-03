import React from "react";
import { inject, observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { Button, IconButton, Menu, MenuItem } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import { UiStateStore } from "../../store/uiStateStore";
import { AccountStore } from "../../store/accountStore";
import { RouteStore } from "../../store/routeStore";
import { useStyles } from "./accountMenu.styles";
import AccountMenu from "./accountMenu";

interface IProps {
  uiStateStore?: UiStateStore;
  accountStore?: AccountStore;
  routeStore?: RouteStore;
}

const AccountMenuContainer = ({
  uiStateStore,
  accountStore,
  routeStore,
}: IProps) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const open = Boolean(uiStateStore!.accountMenuAnchor);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    uiStateStore!.setAccountMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    uiStateStore!.setAccountMenuAnchor(null);
  };

  const handleAccountInfo = () => {
    routeStore!.redirect("/account");
  }

  const handleSignIn = () => {
    uiStateStore!.setAccountMenuAnchor(null);
    routeStore!.redirect("/signIn");
  };

  const handleRegister = () => {
    uiStateStore!.setAccountMenuAnchor(null);
    routeStore!.redirect("/register");
  };

  const handleSignOut = () => {
    uiStateStore!.setAccountMenuAnchor(null);
    accountStore!.signOut();
  };

  const username = accountStore!.userInfo?.username

  return (
    <AccountMenu
      open={open}
      anchorEl={uiStateStore!.accountMenuAnchor}
      handleMenuOpen={handleMenuOpen}
      handleMenuClose={handleMenuClose}
      handleAccountInfo={handleAccountInfo}
      handleSignIn={handleSignIn}
      handleSignOut={handleSignOut}
      handleRegister={handleRegister}
      username={username}
    />
  );
};

export default inject(
  "uiStateStore",
  "accountStore",
  "routeStore"
)(observer(AccountMenuContainer));
