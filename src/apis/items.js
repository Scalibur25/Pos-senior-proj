const axios = require("axios");

function getItems() {
  return axios.get(process.env.VUE_APP_API_HOST + `/items`);
}

function createItem(body) {
  try {
    return axios.post(process.env.VUE_APP_API_HOST + `/items`, { data: body });
  } catch (e) {
    throw Error;
  }
}
module.exports = { getItems, createItem };
