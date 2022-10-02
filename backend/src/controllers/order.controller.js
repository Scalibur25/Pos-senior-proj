const orderService = require('../services/order.service')

const methods = {


  async createItems(req, res) {
    const { data } = req.body
    try {
      console.log(data)
      const playload = {}
      const items = await orderService.create(data); 
      return res.json(items)
    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  },

};

module.exports = { ...methods };