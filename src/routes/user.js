import express from "express";
import userService from "../services/userservice";
import constants from "../constants";

const router = express.Router();

router.get("/last", async (req, res) => {
  const user = await userService.getLastUser();
  res.json({
    success: true,
    user,
  });
});

router.get("/", async (req, res) => {
  const users = await userService.getUsers();
  res.json({
    success: true,
    users,
  });
});

router.post("/", async (req, res) => {
  const { name, accessibility, price } = req.body;
  // If unsupported accessibility or price type is used, return error
  if (
    !Object.keys(constants.ACCESSIBILITY).includes(accessibility) ||
    !Object.keys(constants.PRICE).includes(price)
  ) {
    res.json({
      success: false,
      errors: ["Unsupported accessibility or price type"],
    });
    return;
  }
  try {
    const user = await userService.createUser(name, accessibility, price);
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

module.exports = router;
