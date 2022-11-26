const { PrismaClient } = require("@prisma/client");
const short = require("short-uuid");
const prisma = new PrismaClient();

const methods = {
  async get(search = undefined) {
    console.log(search)
    const searchOption = search ? {
      orderId: {
        contains: search
      }
    } : {}

    const whereOption = {
      where: { ...searchOption }
    }

    return prisma.order.findMany({
      ...whereOption,
      include: {
        itemList: {
          include: {
            Item: true,
          },
        },
      },
      orderBy: {
        createAt: "desc",
      },
    });
  },

  async getById(id) {
    return prisma.order.findUnique({
      where: {
        id: id,
      },
      include: {
        category: true,
        itemList: {
          include: {
            Item: true,
          },
        },
      },
    });
  },

  async create(data) {
    const decimalTranslator = short("0123456789").generate();
    const paidAt = data.paidAt ? { paidAt: new Date() } : {};
    const result = prisma.order.create({
      data: {
        price: data.price,
        discount: parseFloat(data.discount),
        note: data.note.length > 0 ? data.note : null,
        orderId: parseInt(decimalTranslator.toString().substring(0, 9)),
        ...paidAt,
        itemList: {
          createMany: {
            data: data.itemlist.map((e) => {
              return {
                itemId: e.id,
                quantity: e.amount,
                price: e.price,
              };
            }),
            skipDuplicates: false,
          },
        },
      },
    });
    await Promise.all(
      data.itemlist.map((e) => {
        return prisma.item.update({
          where: {
            id: e.id,
          },
          data: {
            quantity: {
              decrement: e.amount,
            },
          },
        });
      })
    );

    return result;
  },

  async update(id, data) {
    return prisma.order.update({
      data,
      where: {
        id,
      },
    });
  },

  async delete(id) {
    return prisma.order.delete({
      where: {
        id: id,
      },
    });
  },
};

module.exports = { ...methods };
