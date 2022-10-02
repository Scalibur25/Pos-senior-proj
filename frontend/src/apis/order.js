const axios = require("axios");

function createOrder(body) {
  try {
    return axios.post(process.env.VUE_APP_API_HOST + `/order`, { data: body });
  } catch (e) {
    throw Error;
  }
}
module.exports = { createOrder };
