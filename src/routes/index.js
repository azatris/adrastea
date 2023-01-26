import express from "express";

const router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  res.send("TODO: Level 3");
});

module.exports = router;
