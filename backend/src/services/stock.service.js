const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const methods = {

  async get() {
    return prisma.stock.findMany()
  },

  async getById(id) {
    return prisma.stock.findUnique({
      where:{
        id: id
      }
    })
  },

  async create(data){
    return prisma.stock.create({
      data
    })
  },

  async update(id,data){
    return prisma.stock.update({
      data,
      where:{
        id
      },
      include: {
        item: {
          include:{
            category : true
          }
        }
      }
    })
  },

  async delete(id){
    return prisma.stock.delete({
      where:{
        id: id
      }
    })
  }

};

module.exports = { ...methods };