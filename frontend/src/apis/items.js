const axios = require("axios");
console.log(process.env.VUE_APP_API_HOST);
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

function editItem(body) {
  try {
    return axios.put(process.env.VUE_APP_API_HOST + `/items/` + body.id, {
      data: body,
    });
  } catch (e) {
    throw Error;
  }
}
module.exports = { getItems, createItem, editItem };
