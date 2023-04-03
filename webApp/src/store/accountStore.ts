/* eslint-disable no-debugger */
import { makeObservable, action, computed, observable } from "mobx";
import { Auth } from "aws-amplify";
import { RootStore } from "./rootStore";
import {
  IRegisterForm,
  ISignInForm,
  IForgotPasswordForm,
  IForgotPasswordSubmitForm,
  IUserInfo,
} from "../interfaces/account.interface";
import axios, { Canceler, CancelToken, CancelTokenSource, CancelTokenStatic } from "axios";


// Amplify: https://docs.amplify.aws/lib/auth/getting-started/q/platform/js

export class AccountStore {
  @observable userInfo: IUserInfo | null = null;
  @observable forgotUsername: string | undefined = undefined;

  // cancelToken: CancelTokenSource = axios.CancelToken.source()
  cancelRequest: Canceler | undefined = undefined;

  constructor(private rootStore: RootStore) {
    makeObservable(this);
  }

  generateCancelToken() {
    return new axios.CancelToken((c) => {
      this.cancelRequest = c;
    })
  }

  @action
  async register(register: IRegisterForm) {
    try {
      await Auth.signUp({
        username: register.username,
        password: register.password,
        attributes: {
          email: register.email,
        },
      });
      this.rootStore.routeStore.redirect("/signIn");
    } catch (error) {
      this.rootStore.notificationStore.createNotification(
        "register",
        "error",
        true,
        error
      );
    }
  }

  @action
  async signIn(signIn: ISignInForm) {
    try {
      this.rootStore.uiStateStore.setSubmitting(true);
      await Auth.signIn(signIn.username, signIn.password);
      await this.fetchUserInfo();
      this.rootStore.routeStore.redirect("/products");
    } catch (error) {
      this.rootStore.notificationStore.createNotification(
        "signIn",
        "error",
        true,
        error
      );
    } finally {
      this.rootStore.uiStateStore.setSubmitting(false);
    }
  }

  @action
  async signOut() {
    try {
      await Auth.signOut();
      // this.userInfo = null; // If the site refresh, fetchUserInfo() will be executed and the userInfo will set anyway
    } catch (error) {
      this.rootStore.notificationStore.createNotification(
        "signOut",
        "error",
        true,
        error
      );
    } finally {
      this.rootStore.routeStore.redirect("/signIn");
    }
  }

  @action
  async forgotPassword({ username }: IForgotPasswordForm) {
    try {
      await Auth.forgotPassword(username);
      this.setForgotUsername(username);
    } catch (error) {
      this.rootStore.notificationStore.createNotification(
        "forgot_password",
        "error",
        true,
        error
      );
    }
  }

  @action
  async forgotPasswordSubmit({
    username,
    code,
    password,
  }: IForgotPasswordSubmitForm) {
    try {
      await Auth.forgotPasswordSubmit(username, code, password);
      this.rootStore.routeStore.redirect("/signIn");
      this.setForgotUsername(undefined);
    } catch (error) {
      this.rootStore.notificationStore.createNotification(
        "forgot_password_submit",
        "error",
        true,
        error
      );
    }
  }

  @action
  async changePassword(oldPassword: string, newPassword: string) {
    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(user, oldPassword, newPassword);
    } catch (error) {
      this.rootStore.notificationStore.createNotification(
        "change_password",
        "error",
        true,
        error
      );
    }
  }

  @action
  async fetchUserInfo() {
    if (!this.rootStore.uiStateStore.fetchingUser) {
      try {
        this.rootStore.uiStateStore.setFetchingUser(true);
        const userInfo = (await Auth.currentUserInfo()) as IUserInfo | null;
        // const userInfo: IUserInfo = {username: "Test", attributes: {email: "test@mail.com", email_verified: "true", sub: "" }};
        this.setUserInfo(userInfo);
      } catch (error) {
        this.setUserInfo(null);
        this.rootStore.notificationStore.createNotification(
          "fetch_user",
          "error",
          true,
          error
        );
      } finally {
        this.rootStore.uiStateStore.setFetchingUser(false);
        // Its initiating, also when the an error occured => the user returns to login page
        if(!this.rootStore.uiStateStore.isInitiating) {
          this.rootStore.uiStateStore.setInitiated(true);
        }
      }
    }
  }

  @action
  setUserInfo(userInfo: IUserInfo | null) {
    this.userInfo = userInfo;
  }

  @action
  setForgotUsername(username: string | undefined) {
    this.forgotUsername = username;
  }
}
