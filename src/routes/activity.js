import express from "express";
import { getTransformedActivity } from "../services/activityservice";

export const router = express.Router();

/**
 * @returns {Promise<*>} An activity from the Bored API, transformed to our own format
 */
router.get("/", async (req, res, next) => {
    try {
        const activity = await getTransformedActivity();
        res.send(activity);
    } catch (e) {
        next(e);
    }
});
