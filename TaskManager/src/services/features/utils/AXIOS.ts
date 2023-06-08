// import axios from "axios";
// import { useEffect } from "react";
// import store from "../../app/store";
// import { json } from "react-router-dom";

// const baseURL = "http://localhost:3000";

// let token = localStorage.getItem("authToken");
// let authToken = token ? JSON.parse(token) : null;

// // let authToken = JSON.parse(localStorage.getItem("authToken"));
// // let authToken = store.getState().auth.authToken;

// store.subscribe(() => {
//   // authToken = useAppSelector((state) => state.auth.authToken);
//   authToken = store.getState().auth.authToken?.accessToken;
//   let saied = store.getState().calendar.calendarState.date;
//   console.log(authToken, saied);
// });

// const AXIOS = axios.create({
//   baseURL,
//   // headers: { "x-auth-token": authToken?.access },
// });

// AXIOS.interceptors.request.use(
//   async (req) => {
//     if (authToken?.accessToken) {
//       // authToken = token ? JSON.parse(token) : null;
//       req.headers["x-auth-token"] = authToken.accessToken;
//     }

//     console.log("interceptr ran");
//     return req;
//   },
//   (error) => Promise.reject(error)
// );

// export default AXIOS;
