import { Auth } from "aws-amplify";
import axios, { AxiosError } from "axios";
import { rootStore } from "../index";

export const configureAxios = () => {
  axios.interceptors.request.use(
    async function (config) {
      // config.headers.Authorization = `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}`;
      return config;
    },
    function (error: AxiosError) {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (config) {
      return config;
    },
    function (error: AxiosError) {
      if (error.response?.data === "error:token_expired") {
        rootStore.accountStore.signOut();
        rootStore.routeStore.redirect("/signIn", true);
      }
      return Promise.reject(error);
    }
  );
};
