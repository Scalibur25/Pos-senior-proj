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
      data,
      include:{
        category:true
      }
    })
  },

  async updateItems(id,data){
    return prisma.item.update({
      data,
      where:{
        id
      },
      include: {
        category: true
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