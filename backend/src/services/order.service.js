const { PrismaClient } = require("@prisma/client");
const short = require('short-uuid');
const prisma = new PrismaClient();

const methods = {

  async get() {
    return prisma.order.findMany({
      include: {
        category: true,
        itemList:{
          include:{
            Item: true
          }
        }
      }
    })
  },

  async getById(id) {
    return prisma.order.findUnique({
      where:{
        id: id
      },
      include: {
        category: true,
        itemList:{
          include:{
            Item: true
          }
        }
      }
    })
  },

  async create(data){
    const decimalTranslator = short("0123456789");
    return prisma.order.create({
      data:{
        id: decimalTranslator,
        ...data,
        

      }
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