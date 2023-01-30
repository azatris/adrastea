import express from "express";
import bodyParser from "body-parser";
import { router as indexRouter } from "./routes/index.js";
import { router as activityRouter } from "./routes/activity";
import { router as userRouter } from "./routes/user";
import { router as error500Router } from "./routes/error500Router";
import { errorResponder, invalidPathHandler } from "./middleware";

const app = express();
const port = process.env.PORT ?? 5000;

const logger = require("morgan");

app.use(logger("dev"));

app.use(bodyParser.json());
app.use("/", indexRouter);
app.use("/activity", activityRouter);
app.use("/user", userRouter);
app.use("/500", error500Router);

app.use(errorResponder);
app.use(invalidPathHandler);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
