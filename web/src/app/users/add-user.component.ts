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

  constructor(private router: Router, private usersService: UsersService) {}

  ngOnInit() {}

  async save() {
    await this.usersService.add(this.name, this.email);
    await this.router.navigate(['/users']);
  }
}
