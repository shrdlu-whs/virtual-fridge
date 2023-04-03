import { inject, observer } from "mobx-react";
import React from "react";
import { useHistory, useLocation } from "react-router";
import { RouteStore } from "../../store/routeStore";
import { AccountStore } from "../../store/accountStore";

interface IReactionContainer {
  routeStore?: RouteStore;
  accountStore?: AccountStore;
}

const ReactionContainer = ({
  routeStore,
  accountStore,
}: IReactionContainer) => {
  const history = useHistory();
  const location = useLocation();

  // Fetch the userinformation for protected routes
  React.useEffect(() => {
    accountStore!.fetchUserInfo();
  });

  const path = routeStore!.redirectedTo;

  if (path && path !== location.pathname) {
    routeStore!.resetRedirectedTo();
    history.push(path);
  }

  return null;
};

export default inject(
  "routeStore",
  "accountStore"
)(observer(ReactionContainer));
