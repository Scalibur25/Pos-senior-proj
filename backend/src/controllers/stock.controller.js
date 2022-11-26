const stockService = require('../services/stock.service')
const itemService = require('../services/item.service');
const { prisma } = require('@prisma/client');

const methods = {

  async get(req, res) {
    try {
      const items = await stockService.get(); 
      return res.json(items)
    } catch (error) {
      return res.status(500).json(error)
    }
  },

  async getById(req, res) {
    const id = req.params.id
    try {
      const items = await stockService.getById(id); 
      if(items){
        return res.json(items)
        
      }else{
        return res.status(404).json({message: `item id: ${id} not found`})
      }
    } catch (error) {
      return res.status(500).json(error)
    }
  },

  async create(req, res) {
    const { data } = req.body
    try { 
      const quantityUpdate = { quantity: {
        increment: data.amount,
      }}
      const [stock,items] = await Promise.all([stockService.create(data), itemService.updateItems(data.itemId, quantityUpdate)])
      return res.json(items)
    } catch (error) {
      return res.status(500).json(error)
    }
  },

  async update(req, res) {
    const { id } = req.params
    const { data } = req.body
    try {
      const items = await stockService.update(id,data); 
      return res.json(items)
    } catch (error) {
      return res.status(500).json(error)
    }
  },

  async delete(req, res) {
    const { id } = req.params
    try {
      const items = await stockService.delete(id); 
      return res.json(items)
    } catch (error) {
      return res.status(500).json(error)
    }
  },

};

module.exports = { ...methods };