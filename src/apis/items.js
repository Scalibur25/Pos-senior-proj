const axios = require("axios");

function getItems() {
  return axios.get(process.env.VUE_APP_API_HOST + `/items`);
}
module.exports = { getItems };
