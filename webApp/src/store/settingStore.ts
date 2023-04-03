/* eslint-disable no-debugger */
import { makeObservable, action, observable } from "mobx";
import { RootStore } from "./rootStore";
import { persist } from "mobx-persist"

export class SettingStore {

  constructor(private rootStore: RootStore) {
    // makeObservable(this)
  }

}
