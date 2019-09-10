import { MongoClient } from 'mongodb';
import { config } from './config';

let connection;

async function getConnection() {
  if (!connection) {
    connection = await MongoClient.connect(config.MONGODB_URL, {
      useNewUrlParser: true,
    });
  }

  return connection;
}

export async function getUsers() {
  const db = (await getConnection()).db();

  const users = await db
    .collection('users')
    .find()
    .toArray();

  return users.map(user => ({
    name: user.name,
    email: user.email,
  }));
}

export async function createUser(email: string, name: string) {
  const db = (await getConnection()).db();

  const users = await getUsers();

  if (users.map(item => item.email).includes(email)) {
    return undefined;
  }

  await db.collection('users').insertOne({
    email,
    name,
  });
}
