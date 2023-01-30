import express from "express";

const router = express.Router();

/**
 * Generic response from server
 */
router.get("/", async (req, res) => {
  res.send("Hello from server");
});

export default router;
