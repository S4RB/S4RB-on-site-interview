import { Collection, Db, MongoClient } from 'mongodb';
import { config } from './config';
import { createUser, getUsers } from './store';

jest.mock('./config');

describe('Store', () => {
  describe('getting existing users', () => {
    let client: MongoClient;
    let userCollection: Collection;
    let users: { name: string; email: string }[];

    beforeAll(async () => {
      config.MONGODB_URL = 'mongodb://localhost:27017/interview-testing';

      client = await MongoClient.connect(config.MONGODB_URL, {
        useNewUrlParser: true,
      });

      const db = client.db();

      userCollection = db.collection('users');

      await userCollection.insertMany([
        { name: 'bobby', email: 'bobby.bobb@email.com' },
        { name: 'greggy', email: 'greggy.bobb@email.com' },
      ]);

      users = await getUsers();
    });

    afterAll(async () =>
      Promise.all([userCollection.deleteMany({}), client.close()])
    );

    it('retrieves the 2 users', () => {
      expect(users).toHaveLength(2);
    });

    it('returns the user names and emails', () => {
      expect(users).toEqual(
        expect.arrayContaining([
          { name: 'bobby', email: 'bobby.bobb@email.com' },
          {
            name: 'greggy',
            email: 'greggy.bobb@email.com',
          },
        ])
      );
    });
  });

  describe('creating new user', () => {
    let client: MongoClient;
    let userCollection: Collection;

    beforeAll(async () => {
      config.MONGODB_URL = 'mongodb://localhost:27017/interview-testing';

      client = await MongoClient.connect(config.MONGODB_URL, {
        useNewUrlParser: true,
      });

      const db = client.db();

      userCollection = db.collection('users');

      await userCollection.insertMany([
        { name: 'foo', email: 'foo@bar.com' },
      ]);
    });

    afterAll(async () =>
      Promise.all([userCollection.deleteMany({}), client.close()])
    );

    describe('when email does not already exist', () => {
      it('creates the user', async () => {
        await createUser('mk@abc.abc', 'foo');

        expect(await userCollection.count({ email: 'mk@abc.abc' })).toEqual(1);
      });
    });

    describe('when email does already exist', () => {
      it('does not update the user', async () => {
        await createUser('foo@bar.com', 'new foo');

        expect(await userCollection.count({ name: 'new foo' })).toEqual(0);
      });
    });
  });
});
