const axios = require("axios");

function createOrder(body) {
  console.log(body);
  try {
    return axios.post(process.env.VUE_APP_API_HOST + `/order`, { data: body });
  } catch (e) {
    throw Error;
  }
}

function getOrder() {
  try {
    return axios.get(process.env.VUE_APP_API_HOST + `/order`);
  } catch (e) {
    throw Error;
  }
}

module.exports = { createOrder, getOrder };
