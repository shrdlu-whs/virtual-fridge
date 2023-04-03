import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Redirect, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { responsiveFontSizes } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { configure } from "mobx";
import { Provider } from "mobx-react";
import { enableLogging } from "mobx-logger";
import { create } from "mobx-persist";
import Amplify, {Auth} from "aws-amplify";
import { config } from "./config/app.config";
import virtualFridgeTheme from "./assets/themes/virtual-fridge-theme";
import { RootStore } from "./store/rootStore";
import SignIn from "./routes/signIn/signIn";
import Register from "./routes/register/register";
import ForgotPassword from "./routes/forgotPassword/forgotPassword";
import Products from "./routes/products/products";
import configureI18n from "./config/i18n";
import ReactionContainer from "./components/reaction-container/reactionContainer";
import Notifier from "./components/notifier/notifier";
import ToastWrapper from "./components/toast-wrapper/toastWrapper";
import Header from "./components/header/headerContainer";
import DrawerWrapper from "./components/navigation-drawer/drawerWrapperContainer";
import ProtectedRoute from "./components/protected-route/protectedRoute";
import "react-toastify/dist/ReactToastify.min.css";
import GroceryList from "./routes/groceryList/groceryList";
import IronStock from "./routes/ironStock/ironStock";
import { configureAxios } from "./config/axios"
import ShoppingLists from "./routes/shoppinglist/shoppingList";
import Recipes from "./routes/recipes/recipes"

// Cognito user managment
Amplify.configure({
  Auth: {
    mandatorySignId: true,
    region: config.cognito.region,
    userPoolId: config.cognito.user_pool_id,
    userPoolWebClientId: config.cognito.app_client_id,
  }
});
// Backend api requests & responses
configureAxios();
// Translations
configureI18n();
// MobX - State store
enableLogging({
  action: false,
  reaction: true,
  transaction: false,
  compute: false,
});
configure({ enforceActions: "observed" });

const theme = responsiveFontSizes(virtualFridgeTheme());
export const rootStore: RootStore = new RootStore();

const app = (
  <>
    <ThemeProvider theme={theme}>
      <Provider {...rootStore}>
        <Suspense fallback={null}>
          <Router>
            <CssBaseline />
            <ToastWrapper />
            <Header />
            <DrawerWrapper>
              <Route exact path="/signIn" component={SignIn} />
              <Route exact path="/forgotPassword" component={ForgotPassword} />
              <Route exact path="/register" component={Register} />
              <ProtectedRoute exact path="/products" component={Products} authenticationPath="/signIn" defaultRoute />
              <ProtectedRoute exact path="/ironstock" component={IronStock} authenticationPath="/signIn" />
              <ProtectedRoute exact path="/grocerylist/:id" component={GroceryList} authenticationPath="/signIn" />
              <ProtectedRoute exact path="/recipes" component={Recipes} authenticationPath="/signIn" /> 
              <ProtectedRoute exact path="/shopping" component={ShoppingLists} authenticationPath="/signIn" />
            </DrawerWrapper>
            <Notifier />
            <ReactionContainer />
          </Router>
        </Suspense>
      </Provider>
    </ThemeProvider>
  </>
);

// const hydrate = create({
//   jsonify: true,
// });

// Promise.all([
//   hydrate("account", rootStore.accountStore),
//   hydrate("uiState", rootStore.uiStateStore),
//   hydrate("setting", rootStore.settingStore),
// ]).then(() => {
ReactDOM.render(app, document.getElementById("root"));
// });
