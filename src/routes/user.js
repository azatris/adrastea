import express from "express";
import { getLastUser, getUsers, createUser } from "../services/userservice";
import constants from "../constants";

export const router = express.Router();

router.get("/last", async (req, res) => {
  const user = await getLastUser();
  res.json({
    success: true,
    user,
  });
});

router.get("/", async (req, res) => {
  const users = await getUsers();
  res.json({
    success: true,
    users,
  });
});

router.post("/", async (req, res) => {
  const { name, accessibility, price } = req.body;
  // If unsupported accessibility or price type is used, return error
  const isAccessibilityValid = !accessibility || Object.keys(constants.ACCESSIBILITY).includes(accessibility);
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
    res.json({
      success: false,
      errors: [e],
    });
  }
});
