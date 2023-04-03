import { makeObservable, action, observable } from "mobx";
import { fromStream } from "mobx-utils";
import { RootStore } from "./rootStore";
import { Redirect } from "react-router-dom"

export class RouteStore {
  @observable redirectedTo: string | undefined = undefined;

  constructor(private rootStore: RootStore) {
    makeObservable(this)
  }

  @action
  redirect(path: string, tokenExpired: boolean = false) {
    if (this.redirectedTo !== path) {
      if (tokenExpired) {
        this.rootStore.notificationStore.createNotification(
          "token_expired",
          "error",
          true
        );
      }
      this.redirectedTo = path;
    }
  }

  @action
  resetRedirectedTo() {
    this.redirectedTo = undefined;
  }
}
