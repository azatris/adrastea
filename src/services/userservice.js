import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getLastUser = async () =>
  prisma.user.findFirst({ orderBy: { id: "desc" } });

const getUsers = async () => prisma.user.findMany();

const createUser = async (name, accessibility, price) => {
  try {
    return await prisma.user.create({
      data: {
        name,
        accessibility,
        price,
      },
    });
  } catch (e) {
    console.error(e);
    throw e;
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = {
  getUsers,
  createUser,
  getLastUser,
};
