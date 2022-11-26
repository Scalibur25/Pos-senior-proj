const axios = require("axios");
//console.log(process.env.VUE_APP_API_HOST);
function getItems() {
  return axios.get(process.env.VUE_APP_API_HOST + `/items`);
}

function getReadyItems(
  data = {
    search: undefined,
    filterBy: undefined,
    filterVal: undefined,
  }
) {
  const searchOption = data?.search;
  const filterByOption = data?.filterBy;
  const filterValOption = data?.filterVal;

  return axios.get(process.env.VUE_APP_API_HOST + `/items`, {
    params: {
      status: true,
      search: searchOption,
      filterBy: filterByOption,
      filterVal: filterValOption,
    },
  });
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

function deleteItem(id) {
  try {
    return axios.delete(process.env.VUE_APP_API_HOST + `/items/` + id);
  } catch (e) {
    throw Error;
  }
}

module.exports = { getItems, createItem, editItem, getReadyItems, deleteItem };
