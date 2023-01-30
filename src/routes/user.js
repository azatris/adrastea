import express from "express";
import { getLastUser, getUsers, createUser } from "../services/userservice";
import constants from "../constants";

const router = express.Router();

/**
 * @returns {Promise<*>} The last user created
 */
router.get("/last", async (req, res, next) => {
  try {
    const user = await getLastUser();
    res.json({
      success: true,
      user,
    });
  } catch (e) {
    next(e);
  }
});

/**
 * @returns {Promise<*>} All users
 */
router.get("/", async (req, res, next) => {
  try {
    const users = await getUsers();
    res.json({
      success: true,
      users,
    });
  } catch (e) {
    next(e);
  }
});

/**
 * @param name - The name of the user
 * @param accessibility - The accessibility of the user (Low, Medium, High)
 * @param price - The price of the user (Free, Low, High)
 * @returns {Promise<*>} The created user
 */
router.post("/", async (req, res, next) => {
  const { name, accessibility, price } = req.body;
  // If unsupported accessibility or price type is used, return error
  const isAccessibilityValid =
    !accessibility ||
    Object.keys(constants.ACCESSIBILITY).includes(accessibility);
  const isPriceValid = !price || Object.keys(constants.PRICE).includes(price);
  if (!isAccessibilityValid || !isPriceValid) {
    res.json({
      success: false,
      errors: ["Unsupported accessibility or price type"],
    });
    return;
  }
  try {
    const user = await createUser(name, accessibility, price);
    res.json({
      success: true,
      user,
    });
  } catch (e) {
    next(e);
  }
});

export default router;
