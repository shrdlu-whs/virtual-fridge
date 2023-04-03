import * as React from "react";
import { useLocation } from "react-router";
import { Grid, Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { inject, observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { useStyles } from "./registerContainer.styles";
import { AccountStore } from "../../store/accountStore";
import { UiStateStore } from "../../store/uiStateStore";
import RegisterForm from "./registerForm/registerForm"
import { IRegisterForm } from "../../interfaces/account.interface";

interface IRegisterProps {
  accountStore?: AccountStore;
  uiStateStore?: UiStateStore;
}

const RegisterContainer = ({
  accountStore,
  uiStateStore,
}: IRegisterProps) => {
  const classes = useStyles();
  const location = useLocation();
  const { t } = useTranslation();

  const handleValidate = (register: IRegisterForm) => {
    accountStore!.register(register)
  };

  return (
    <RegisterForm 
      handleValidate={handleValidate}
      isSubmitting={uiStateStore!.isSubmitting}
    />
  );
};

export default inject("accountStore", "uiStateStore")(observer(RegisterContainer));
