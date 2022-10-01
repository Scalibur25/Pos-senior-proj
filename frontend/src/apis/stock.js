const axios = require("axios");

function stockItem(body) {
  try {
    return axios.post(process.env.VUE_APP_API_HOST + `/stock`, { data: body });
  } catch (e) {
    throw Error;
  }
}
module.exports = { stockItem };
