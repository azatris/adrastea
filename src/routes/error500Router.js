import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Error: 500");
});

module.exports = router;
