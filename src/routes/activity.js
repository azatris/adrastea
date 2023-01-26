import express from "express";
import activityService from "../services/activityservice";

const router = express.Router();

router.get("/", (req, res, next) => {
  activityService
    .getTransformedActivity()
    .then((activity) => {
      res.send(activity);
    })
    .catch((e) => {
      next(e);
    });
});

module.exports = router;
