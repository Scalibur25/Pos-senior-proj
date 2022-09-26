const categoryService = require('../services/category.service')

const methods = {

  async get(req, res) {
    try {
      const items = await categoryService.get(); 
      return res.json(items)
    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  },

  async getById(req, res) {
    const id = req.params.id
    console.log(id)
    try {
      const items = await categoryService.getById(id); 
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
      const items = await categoryService.create(data); 
      return res.json(items)
    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  },

  async update(req, res) {
    const { id } = req.params
    const { data } = req.body
    try {
      const items = await categoryService.update(id,data); 
      return res.json(items)
    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  },

  async delete(req, res) {
    const { id } = req.params
    try {
      const items = await categoryService.delete(id); 
      return res.json(items)
    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  },

};

module.exports = { ...methods };