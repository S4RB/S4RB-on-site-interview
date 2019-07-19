import request from 'supertest';
import { getUsers } from './store';
import app from './app';

jest.mock('./store');

describe('App', () => {
  describe('when getting users from the app', () => {
    let response: request.Response;

    beforeAll(async () => {
      (getUsers as jest.Mock).mockResolvedValue([
        {
          name: 'Kenny C',
          email: 'kenny.c@gmail.com',
        },
      ]);

      response = await request(app).get('/api/users');
    });

    afterAll(() => jest.resetAllMocks());

    it('returns the users in the response', () => {
      expect(response.ok).toBeTruthy();
      expect(response.get('Content-Type')).toMatch(/json/);

      expect(response.body).toHaveLength(1);
      expect(response.body[0].name).toEqual('Kenny C');
      expect(response.body[0].email).toEqual('kenny.c@gmail.com');
    });
  });

  describe('when getting users from the app where no users exist', () => {
    let response: request.Response;

    beforeAll(async () => {
      response = await request(app).get('/api/users');
    });

    it('returns zero users', () => {
      expect(response.ok).toBeTruthy();
      expect(response.get('Content-Type')).toMatch(/json/);

      expect(response.body).toHaveLength(0);
    });
  });
});
