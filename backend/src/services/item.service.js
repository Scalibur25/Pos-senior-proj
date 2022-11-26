const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const methods = {

  async getItems(status, Option = {
    search: undefined,
    filterBy: undefined,
    filterVal: undefined,
  }) {
    const searchOption = Option.search ? {
      OR: [{
        name: {
          contains: Option.search,
        }
      }, {
        description: {
          contains: Option.search,
        }
      }]
    } : {};
    let filterByOption = {};

    if (Option.filterBy) {
      if (Option.filterBy === 'category') filterByOption = {
        category: {
          some: {
            id: Option.filterVal
          }
        }
      }
      else filterByOption = {}
    }

    const statusOption = status === 'null' ? {} : { status: Boolean(status) }
    const data = await prisma.item.findMany({
      where: {
        ...statusOption,
        ...searchOption,
        ...filterByOption,

      },
      orderBy: [{
        status: 'desc'
      }, {
        quantity: 'desc'
      }],
      include: {
        category: true,
      }
    })
    return data
  },


  async orderItemsCheck(id, amount) {
    return prisma.item.findFirst({
      where: {
        id,
        quantity: {
          gte: amount
        }
      }
    })
  },

  async getItemById(id) {
    return prisma.item.findUnique({
      where: {
        id: id
      }
    })
  },

  async createItems(data) {
    return prisma.item.create({
      data,
      include: {
        category: true
      }
    })
  },

  async updateItems(id, data) {
    return prisma.item.update({
      data,
      where: {
        id
      },
      include: {
        category: true
      }
    })
  },

  async deleteItems(id) {
    return prisma.item.delete({
      where: {
        id: id
      }
    })
  }

};

module.exports = { ...methods };