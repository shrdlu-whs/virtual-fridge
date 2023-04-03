import * as React from "react";
import { useLocation } from "react-router";
import { Grid, Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { inject, observer } from "mobx-react";
import { useTranslation } from "react-i18next";
// import { useStyles } from "./signInContainer.styles";
import { AccountStore } from "../../store/accountStore";
import { UiStateStore } from "../../store/uiStateStore";
import { RouteStore } from "../../store/routeStore";
import { IForgotPasswordForm, IForgotPasswordSubmitForm } from "../../interfaces/account.interface";
import ForgotPasswordForm from "./forgotPasswordForm/forgotPasswordForm";
import ForgotPasswordSubmitForm from "./forgotPasswordSubmitForm/forgotPasswordSubmitForm";

interface IForgotPasswordContainerProps {
  accountStore?: AccountStore;
  uiStateStore?: UiStateStore;
  routeStore?: RouteStore;
}

const ForgotPasswordContainer = ({
  accountStore,
  uiStateStore,
  routeStore,
}: IForgotPasswordContainerProps) => {
  const location = useLocation();
  const { t } = useTranslation();
  const forgotUsername = accountStore!.forgotUsername;

  const handleValidate = (form :IForgotPasswordForm) => {
    accountStore!.forgotPassword(form);
  };

  const handleSubmitValidate = (form :IForgotPasswordSubmitForm) => {
    accountStore!.forgotPasswordSubmit(form);
  };

  const handleCancelSubmit = () => {
    accountStore!.setForgotUsername(undefined);
  }

  return !forgotUsername ? 
     <ForgotPasswordForm
      handleValidate={handleValidate}
      isSubmitting={uiStateStore!.isSubmitting}
      />
      :
      <ForgotPasswordSubmitForm
      handleValidate={handleSubmitValidate}
      handleCancelSubmit={handleCancelSubmit}
      username={forgotUsername}
      isSubmitting={uiStateStore!.isSubmitting}
      />
};

export default inject(
  "accountStore",
  "uiStateStore",
  "routeStore"
)(observer(ForgotPasswordContainer));
