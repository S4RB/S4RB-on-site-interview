import { MongoClient } from 'mongodb';
import { config } from './config';

export async function getUsers() {
  const db = (await MongoClient.connect(config.MONGODB_URL, {
    useNewUrlParser: true,
  })).db();

  const users = await db
    .collection('users')
    .find()
    .toArray();

  return users.map(user => ({
    name: user.name,
    eMail: user.email,
  }));
}
