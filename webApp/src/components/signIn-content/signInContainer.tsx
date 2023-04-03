import * as React from "react";
import { useLocation } from "react-router";
import { Grid, Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { inject, observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { useStyles } from "./signInContainer.styles";
import { AccountStore } from "../../store/accountStore";
import { UiStateStore } from "../../store/uiStateStore";
import { RouteStore } from "../../store/routeStore";
import { ISignInForm } from "../../interfaces/account.interface"
import SignInForm from "./signInForm/signInForm"


interface ISignInProps {
  accountStore?: AccountStore;
  uiStateStore?: UiStateStore;
  routeStore?: RouteStore
}

const SignInContainer = ({
  accountStore,
  uiStateStore,
  routeStore
}: ISignInProps) => {
  const classes = useStyles();
  const location = useLocation();
  const { t } = useTranslation();

  const handleValidate = (signIn: ISignInForm) => {
    accountStore!.signIn(signIn)
  };

  const handleRedirect = (path: string) => {
    routeStore!.redirect(path);
  }

  return (
    <SignInForm 
    handleValidate={handleValidate}
    handleRedirect={handleRedirect}
    isSubmitting={uiStateStore!.isSubmitting}
    />
  );
};

export default inject("accountStore", "uiStateStore", "routeStore")(observer(SignInContainer));
