import express from "express";
import * as activityService from "../services/activityservice";

export const router = express.Router();

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
