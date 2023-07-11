import axios from "axios";
import { authTokenUpdate, logOut } from "../auth/authSlice";
import store from "../../app/store";

const baseURL = "https://quera-task-server.vercel.app";

let authToken = JSON.parse(localStorage.getItem("authToken") as string) || null;

const AXIOS = axios.create({
  baseURL,
});

AXIOS.interceptors.request.use(
  async (config) => {
    if (authToken?.accessToken) {
      authToken = authToken
        ? JSON.parse(localStorage.getItem("authToken") as string)
        : null;

      config.headers["x-auth-token"] = authToken.accessToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

AXIOS.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // if the error status code is 401 and it's a refresh token request
    if (
      error.response.status === 401 &&
      originalRequest.url.endsWith("/refreshtoken")
    ) {
      // Redirect the user to the login page if refresh token is expired or invalid
      localStorage.removeItem("authToken");
      window.location.href = "/login";
      return Promise.reject(error);
    }

    // if the error status code is 401 and we haven't retried the request yet
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Get a new access token using the refresh token
        const token = JSON.parse(localStorage.getItem("authToken") as string);

        const response = await axios.post(
          "http://localhost:3000/api/auth/refreshtoken",
          {
            refreshToken: token.refreshToken,
          }
        );

        // Update the access token in local storage with the new token

        const newAccessToken = response.data.data.accessToken;
        const currentRefreshToken = token.refreshToken;
        authToken = {
          accessToken: newAccessToken,
          refreshToken: currentRefreshToken,
        };
        localStorage.setItem("authToken", JSON.stringify(authToken));

        // Update the access token in store with the new token
        store.dispatch(authTokenUpdate(authToken));

        // Update the authorization header with the new access token and retry the request
        AXIOS.defaults.headers.common["x-auth-token"] =
          response.data.data.accessToken;
        return AXIOS(originalRequest);
      } catch (refreshError) {
        // Redirect the user to the login page if both tokens are expired or invalid
        // localStorage.removeItem("authToken");
        store.dispatch(logOut());
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default AXIOS;
