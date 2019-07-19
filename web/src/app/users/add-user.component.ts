import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  private name: string;
  private email: string;

  constructor(private usersService: UsersService) {}

  ngOnInit() {}

  save() {
    console.log({ name: this.name, email: this.email });
  }
}
