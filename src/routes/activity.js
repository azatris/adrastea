import express from "express";
import { getTransformedActivity } from "../services/activityservice";

export const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const activity = await getTransformedActivity();
        res.send(activity);
    } catch (e) {
        next(e);
    }
});
