const itemService = require('../services/item.service')

const methods = {

  async getItems(req, res) {
    const status = req.query?.status ? req.query?.status : 'null'
    console.log(status)
    try {
      const items = await itemService.getItems(status); 
      return res.json(items)
    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  },

  async getItemsById(req, res) {
    const id = req.params.id
    try {
      const items = await itemService.getItemById(id); 
      if(items){
        return res.json(items)
        
      }else{
        return res.status(404).json({message: `item id: ${id} not found`})
      }
    } catch (error) {
      return res.status(500).json(error)
    }
  },

  async createItems(req, res) {
    const { data } = req.body
    try {
      const items = await itemService.createItems(data); 
      return res.json(items)
    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  },

  async updateItems(req, res) {
    const { id } = req.params
    const { data } = req.body
    try {
      const items = await itemService.updateItems(id,data); 
      return res.json(items)
    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  },

  async deleteItems(req, res) {
    const { id } = req.params
    try {
      const items = await itemService.deleteItems(id); 
      return res.json(items)
    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  },

};

module.exports = { ...methods };