import express from "express";
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT ?? 3000;

const indexRouter = require('./routes/index');
const activityRouter = require('./routes/activity');
const userRouter = require('./routes/user');
const logger = require('morgan');

app.use(logger('dev'));

app.use(bodyParser.json());
app.use('/', indexRouter);
app.use('/activity', activityRouter);
app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
