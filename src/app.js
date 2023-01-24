import express from "express";
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT ?? 3000;

const indexRouter = require('./routes/index');
const activityRouter = require('./routes/activity');

app.use(bodyParser.json());
app.use('/', indexRouter);
app.use('/activity', activityRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
