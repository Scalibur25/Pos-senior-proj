const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const methods = {

  async getItems() {
    return prisma.item.findMany({
      include: {
        category: true,
      }
    })
  },

  async getItemById(id) {
    return prisma.item.findUnique({
      where:{
        id: id
      }
    })
  },

  async createItems(data){
    return prisma.item.create({
      data
    })
  },

  async updateItems(id,data){
    return prisma.item.update({
      data,
      where:{
        id
      }
    })
  },

  async deleteItems(id){
    return prisma.item.delete({
      where:{
        id: id
      }
    })
  }

};

module.exports = { ...methods };