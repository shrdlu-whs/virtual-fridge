import React from "react";
import { inject, observer } from "mobx-react";
import Header from "./header"
import { UiStateStore } from "../../store/uiStateStore"
import { AccountStore } from "../../store/accountStore"


interface IHeaderContainerProps {
  uiStateStore?: UiStateStore
  accountStore?: AccountStore
}

const HeaderContainerContainer = ({
  uiStateStore,
  accountStore
}: IHeaderContainerProps)  => {

  const loggedIn = Boolean(accountStore!.userInfo);

  return (
    <Header 
      open={uiStateStore!.isSiteNavOpen}
      toggleSidenav={() => uiStateStore!.toggleSidenav()}
      loggedIn={loggedIn}
    />
  );
};

export default inject(
  "uiStateStore",
  "accountStore"
)(observer(HeaderContainerContainer));
