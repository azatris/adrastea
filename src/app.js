import express from "express";
import bodyParser from 'body-parser';
import indexRouter from './routes/index';
import activityRouter from './routes/activity';
import userRouter from './routes/user';
import error500Router from './routes/error500Router';
import {errorResponder, invalidPathHandler} from "./middleware";


const app = express();
const port = process.env.PORT ?? 3000;

const logger = require('morgan');

app.use(logger('dev'));

app.use(bodyParser.json());
app.use('/', indexRouter);
app.use('/activity', activityRouter);
app.use('/user', userRouter);
app.use('/500', error500Router);

app.use(errorResponder)
app.use(invalidPathHandler)

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
