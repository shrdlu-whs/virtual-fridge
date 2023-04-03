import React from "react";
import { inject, observer } from "mobx-react";
import { Redirect, Route, RouteProps } from "react-router";
import { useLocation } from "react-router-dom"
import { AccountStore } from "../../store/accountStore";
import { UiStateStore } from "../../store/uiStateStore";

export interface IProtectedRouteProps extends RouteProps {
  accountStore?: AccountStore;
  uiStateStore?: UiStateStore;
  authenticationPath: string;
  defaultRoute?: boolean;
}

const ProtectedRoute = (props: IProtectedRouteProps) => {
  const {
    accountStore,
    uiStateStore,
    authenticationPath,
    defaultRoute,
    path
  } = props;

  const user = accountStore!.userInfo;
  const isLoading = uiStateStore!.fetchingUser;
  const isInit = uiStateStore!.isInitiating;
  const location = useLocation();



  if (isLoading || !isInit) {
    return null;
  } else if (!user && location.pathname !== "/signIn") {
    // Redirect to login
    const renderComponent = () => (
      <Redirect to={{ pathname: authenticationPath }} />
    );
    return <Route {...props} component={renderComponent} render={undefined} />;
  } else if (defaultRoute && location.pathname !== path) {
    // Default route match
    return (
      <Route exact path="/" render={() => <Redirect to={path as string} />} />
    );
  } else {
    // If the route not match, than it will not open
    if(location.pathname === path && accountStore!.cancelRequest) {
      accountStore!.cancelRequest();
    }
    return <Route {...props} />;
  }
};

export default inject(
  "accountStore",
  "uiStateStore"
)(observer(ProtectedRoute));
