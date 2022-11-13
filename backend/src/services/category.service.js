const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const methods = {

  async get() {
    return prisma.category.findMany({
      include:{
        _count: true
      }
    })
  },

  async getById(id) {
    return prisma.category.findUnique({
      where:{
        id: id
      }
    })
  },

  async create(data){
    return prisma.category.create({
      data
    })
  },

  async update(id,data){
    return prisma.category.update({
      data,
      where:{
        id
      }
    })
  },

  async delete(id){
    return prisma.category.delete({
      where:{
        id: id
      }
    })
  }

};

module.exports = { ...methods };