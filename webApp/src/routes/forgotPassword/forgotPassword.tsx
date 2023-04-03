import * as React from "react";
import { inject, observer } from "mobx-react";
import Grid from "@material-ui/core/Grid";
import ForgotPasswordContainer from "../../components/forgot-password-content/forgotPasswordContainer";
import { useStyles } from "./forgotPassword.styles";
import HeaderContainer from "../../components/header/headerContainer";

const ForgotPassword = () => {
  const classes = useStyles();
  return (
      <div className={classes.forgotPasswordWrapper}>
        <ForgotPasswordContainer />
      </div>
  );
};

export default observer(ForgotPassword);
