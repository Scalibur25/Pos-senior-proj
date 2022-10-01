const itemApis = require("./items");
const stockApis = require("./stock");
const categoryApis = require("./category");

// import axios from "axios";

// axios.interceptors.response.use(
//   (response) => {
//     if (response.status === 401) {
//       window.location.href = "/login";
//     }
//     return response;
//   },
//   (error) => {
//     if (error.response.status === 401) {
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

// function getCookie(cname) {
//   const name = `${cname}=`;
//   const decodedCookie = decodeURIComponent(document.cookie);
//   const ca = decodedCookie.split(";");
//   for (let i = 0; i < ca.length; i += 1) {
//     let c = ca[i];
//     while (c.charAt(0) === " ") {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) === 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return "";
// }
// /* eslint-disable */
// axios.defaults.withCredentials = true;
// axios.defaults.headers.common.Authorization = `Bearer ${getCookie('token')}`;
/* eslint-enable */
export default {
  ...itemApis,
  ...stockApis,
  ...categoryApis,
};
