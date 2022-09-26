const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const methods = {

  async get() {
    return prisma.order.findMany({
      include: {
        category: true,
      }
    })
  },

  async getById(id) {
    return prisma.order.findUnique({
      where:{
        id: id
      }
    })
  },

  async create(data){
    return prisma.order.create({
      data
    })
  },

  async update(id,data){
    return prisma.order.update({
      data,
      where:{
        id
      }
    })
  },

  async delete(id){
    return prisma.order.delete({
      where:{
        id: id
      }
    })
  }

};

module.exports = { ...methods };