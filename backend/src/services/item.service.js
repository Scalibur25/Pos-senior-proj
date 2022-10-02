const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const methods = {

  async getItems(status) {
    const statusOption = status === 'null'? {} : {status:Boolean(status)}
    return prisma.item.findMany({
      where:{
        ...statusOption
      },
      orderBy:[{
        status: 'desc'
      },{
        quantity: 'desc'
      }],
      include: {
        category: true,
      }
    })
  },


  async orderItemsCheck(id,amount) {
    return prisma.item.findFirst({
      where:{ id ,
      quantity: {
        gte: amount
      }}
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