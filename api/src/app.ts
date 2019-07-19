import express from 'express';
import { wrap } from 'express-promise-wrap';
import bodyParser from 'body-parser';
import cors from 'cors';
import { getUsers } from './store';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get(
  '/api/users',
  wrap(async (req, res, next) => {
    const users = await getUsers();
    return res.status(200).json(users);
  })
);

export default app;
