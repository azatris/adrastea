import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getLastUser = async () =>
  prisma.user.findFirst({ orderBy: { id: "desc" } });

export const getUsers = async () => prisma.user.findMany();

export const createUser = async (name, accessibility, price) => {
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
