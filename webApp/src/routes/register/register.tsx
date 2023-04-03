import * as React from "react";
import { inject, observer } from "mobx-react";
import Registercontainer from "../../components/register-content/registerContainer";
import { useStyles } from "./register.styles";
import HeaderContainer from "../../components/header/headerContainer";

const Register = () => {
  const classes = useStyles();
  return (
      <div className={classes.registerWrapper}>
        <Registercontainer />
      </div>
  );
};

export default observer(Register);
