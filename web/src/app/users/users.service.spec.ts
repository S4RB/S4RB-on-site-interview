import { async, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { User, UsersService } from './users.service';

describe('UsersService', () => {
  describe('getting the users', () => {
    let httpMock: HttpTestingController;
    let usersService: UsersService;
    let expectedUsers: User[];

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [UsersService],
      });

      expectedUsers = [
        { name: 'Adam Witko', email: 'adam.witko@company.com' },
        { name: 'Bobby Bobson', email: 'email@email.com' },
      ];

      usersService = TestBed.get<UsersService>(UsersService);
      httpMock = TestBed.get(HttpTestingController);
    });

    it('retrieves the users from the API', async () => {
      const usersPromise = usersService.users();

      const req = httpMock.expectOne('http://localhost:8080/api/users');

      req.flush(expectedUsers);

      const users = await usersPromise;

      expect(users).toHaveLength(2);
      expect(users).toEqual(expect.arrayContaining(expectedUsers));
    });
  });
});
