import { Component, OnInit } from '@angular/core';
import { User, UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  private users: User[];

  private displayedColumns: string[] = ['name', 'email'];

  constructor(private usersService: UsersService) {}

  async ngOnInit() {
    this.users = await this.usersService.users();
  }
}
