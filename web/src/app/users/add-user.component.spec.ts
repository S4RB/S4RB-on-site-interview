import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

import { AddUserComponent } from './add-user.component';
import { UsersService } from './users.service';
import { MaterialModule } from '../material.module';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
  let add: jest.Mock;
  let navigateByUrl: jest.Mock;

  describe('adding a new user', () => {
    beforeEach(async(() => {
      add = jest.fn();
      const usersServiceMock = {
        add,
      };

      navigateByUrl = jest.fn();
      const routerSpy = {
        navigateByUrl,
      };

      TestBed.configureTestingModule({
        imports: [MaterialModule, FormsModule, NoopAnimationsModule],
        providers: [
          { provide: UsersService, useValue: usersServiceMock },
          { provide: Router, useValue: routerSpy },
        ],
        declarations: [AddUserComponent],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(AddUserComponent);
      fixture.detectChanges();

      const nameInput = fixture.nativeElement.querySelector('#name');
      nameInput.value = 'Testy tester';
      nameInput.dispatchEvent(new Event('input'));

      const emailInput = fixture.nativeElement.querySelector('#email');
      emailInput.value = 'Test@testerer.com';
      emailInput.dispatchEvent(new Event('input'));

      fixture.nativeElement.querySelector('#save').click();
    });

    it.skip('attempts to create the user', () => {
      expect(add).toBeCalledTimes(1);
    });

    it.skip('creates the user with the name and email', () => {
      expect(add).toBeCalledWith('Testy tester', 'Test@testerer.com');
    });

    it.skip('navigates to the Users route', () => {
      expect(navigateByUrl).toBeCalledTimes(1);
      expect(navigateByUrl).toBeCalledWith('/users');
    });
  });
});
