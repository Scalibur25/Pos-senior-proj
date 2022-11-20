const axios = require("axios");

function getCategory() {
  return axios.get(process.env.VUE_APP_API_HOST + `/categories`);
}

function createCategory(body) {
  return axios.post(process.env.VUE_APP_API_HOST + `/categories`, {
    data: body,
  });
}

function updateCategory(body) {
  return axios.put(process.env.VUE_APP_API_HOST + `/categories/` + body.id, {
    data: body,
  });
}

function deleteCategory(index) {
  return axios.delete(process.env.VUE_APP_API_HOST + `/categories/` + index);
}

module.exports = {
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
