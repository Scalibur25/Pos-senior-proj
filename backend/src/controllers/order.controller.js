const orderService = require('../services/order.service')
const itemService = require('../services/item.service')


const methods = {


  async createOrder(req, res) {
    const { data } = req.body
    try {
      const itemsStock = await  Promise.all(data.itemlist.map((e)=> itemService.orderItemsCheck(e.id,e.amount)))
      if(itemsStock.findIndex(e=>e===null)!==-1) throw Error('cannot create')
      const items = await orderService.create(data); 
      return res.json(items)
    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  },

  async getOrder(req, res) {
    try {
      const order = await orderService.get(); 
      return res.json(order)
    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  },

};

module.exports = { ...methods };