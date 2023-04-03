import * as React from "react";
import { inject, observer } from "mobx-react";
import Grid from "@material-ui/core/Grid";
import SignIncontainer from "../../components/signIn-content/signInContainer";
import { useStyles } from "./signIn.styles";
import HeaderContainer from "../../components/header/headerContainer";

const SignIn = () => {
  const classes = useStyles();
  return (
      <div className={classes.signInWrapper}>
        <SignIncontainer />
      </div>
  );
};

export default observer(SignIn);
