import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  res.send("Error: 500");
});

export default router;
