import Axios from "axios";
import { ApiRoutes } from "../constants";
import secureLocalStorage from "react-secure-storage";
import { handleLogout } from "../../utility/Utils";

export const axios = Axios.create({
  rejectUnauthorized: false, // (NOTE: this will disable client verification)
  baseURL: ApiRoutes.API_HOSTNAME,
  timeout: 1000000000,
  responseType: "json",
});

axios.interceptors.request.use(
  async (config) => {
    config.headers = {
      Accept: "application/json , */*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(
        secureLocalStorage.getItem("auth_token")
      )}`,
    };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  (error) => {
    console.log("error", error);

    if (error?.response?.status === 403) {
      console.log("ifffffffffffffffff");
      handleLogout();
      // window.location.replace("/");
      // window.location.href("/");
    }

    return Promise.reject(error);
  }
);

export default axios;
