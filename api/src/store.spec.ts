import { Collection, Db, MongoClient } from 'mongodb';
import { config } from './config';
import { getUsers } from './store';

jest.mock('./config');

describe('Store', () => {
  describe('getting existing users', () => {
    let client: MongoClient;
    let userCollection: Collection;
    let users: { name: string; eMail: string }[];

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
          { name: 'bobby', eMail: 'bobby.bobb@email.com' },
          {
            name: 'greggy',
            eMail: 'greggy.bobb@email.com',
          },
        ])
      );
    });
  });
});
