import request from 'supertest';
import { createUser, getUsers } from './store';
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

  describe('when posting new user with email address that does not exist', () => {
    let response: request.Response;

    beforeAll(async () => {
      (createUser as jest.Mock).mockResolvedValue(true);

      response = await request(app).post('/api/users').send({
        email: 'foo@bar.com',
        name: 'foo',
      });
    });

    afterAll(() => jest.resetAllMocks());

    it('returns HTTP 201', () => {
      expect(response.ok).toBeTruthy();
      expect(response.status).toEqual(201);
    });

    it('creates the user', () => {
      expect((createUser as jest.Mock).mock.calls.length).toBe(1);
    });
  });

  describe('when posting new user with email address that does not exist', () => {
    let response: request.Response;

    beforeAll(async () => {
      (getUsers as jest.Mock).mockResolvedValue([
        {
          name: 'Kenny C',
          email: 'kenny.c@gmail.com',
        },
      ]);

      response = await request(app).post('/api/users').send({
        email: 'kenny.c@gmail.com',
        name: 'foo',
      });
    });

    afterAll(() => jest.resetAllMocks());

    it('returns HTTP 204', () => {
      expect(response.ok).toBeTruthy();
      expect(response.status).toEqual(204);
    });
  });
});
