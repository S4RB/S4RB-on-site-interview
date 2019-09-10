import express from 'express';
import { wrap } from 'express-promise-wrap';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createUser, getUsers } from './store';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get(
  '/api/users',
  wrap(async (req, res) => {
    const users = await getUsers();
    return res.status(200).json(users);
  })
);

app.post(
  '/api/users',
  wrap(async (req, res) => {
    const response = await createUser(req.body.email, req.body.name);

    if (!response) {
      return res.sendStatus(204);
    }

    return res.sendStatus(201);
  })
);

export default app;
