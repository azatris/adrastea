import express from "express";

export const router = express.Router();

/**
 * Generic response from server
 */
router.get("/", async (req, res) => {
  res.send("Hello from server");
});
