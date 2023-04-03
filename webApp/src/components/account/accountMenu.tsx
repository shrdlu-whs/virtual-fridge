import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Link,
  Typography,
  Box,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import LaunchIcon from "@material-ui/icons/Launch";
import { useStyles } from "./accountMenu.styles";

type AccountMenuProps = {
  username: string | undefined;
  open: boolean;
  anchorEl: HTMLElement | null;
  handleMenuOpen: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  handleMenuClose: () => void;
  handleAccountInfo: () => void;
  handleSignIn: () => void;
  handleSignOut: () => void;
  handleRegister: () => void;
};

const AccountMenu = ({
  username,
  anchorEl,
  open,
  handleMenuOpen,
  handleMenuClose,
  handleAccountInfo,
  handleSignIn,
  handleSignOut,
  handleRegister,
}: AccountMenuProps) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenuOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id="account-menu"
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={handleMenuClose}
      >
        {username
          ? [
              <MenuItem key="account" onClick={handleAccountInfo}>
                <ListItemText
                  primary={
                    <Typography variant="subtitle2">
                      {t("label.account")}
                      <strong>{username}</strong>
                    </Typography>
                  }
                />
              </MenuItem>,
              <Divider key="devider" />,
              <MenuItem key="registerMenu" onClick={handleSignOut}>
                <ListItemIcon>
                  <LaunchIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={t("action.signOut")} />
              </MenuItem>,
            ]
          : [
              <MenuItem key="signInMenu" onClick={handleSignIn}>
                <ListItemIcon>
                  <ExitToAppIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={t("action.signIn")} />
              </MenuItem>,
              <MenuItem key="signOutMenu" onClick={handleRegister}>
                <ListItemIcon>
                  <VpnKeyIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={t("action.register")} />
              </MenuItem>,
            ]}
      </Menu>
    </>
  );
};

export default AccountMenu;
