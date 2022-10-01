const axios = require("axios");

function getCategory() {
  return axios.get(process.env.VUE_APP_API_HOST + `/categories`);
}
module.exports = { getCategory };
