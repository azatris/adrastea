import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * @returns {Promise<*>} The last user created
 */
export const getLastUser = async () =>
  prisma.user.findFirst({ orderBy: { id: "desc" } });

/**
 * @returns {Promise<*>} All users
 */
export const getUsers = async () => prisma.user.findMany();

/**
 * @param name - The name of the user
 * @param accessibility - The accessibility of the user (Low, Medium, High)
 * @param price - The price of the user (Free, Low, High)
 * @returns {Promise<*>} The created user
 */
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
