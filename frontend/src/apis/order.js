const axios = require("axios");

function createOrder(body) {
  try {
    return axios.post(process.env.VUE_APP_API_HOST + `/order`, { data: body });
  } catch (e) {
    throw Error;
  }
}

function getOrder(
  data = {
    search: undefined,
    filterBy: undefined,
    filterVal: undefined,
  }
) {
  const searchOption = data?.search;
  const filterByOption = data?.filterBy;
  const filterValOption = data?.filterVal;
  try {
    return axios.get(process.env.VUE_APP_API_HOST + `/order`, {
      params: {
        search: searchOption,
        filterBy: filterByOption,
        filterVal: filterValOption,
      },
    });
  } catch (e) {
    throw Error;
  }
}

module.exports = { createOrder, getOrder };
