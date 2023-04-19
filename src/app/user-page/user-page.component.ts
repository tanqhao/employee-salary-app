import { Component, OnInit } from '@angular/core';

import { UserService } from './user.service';
import { User } from './user.model';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  userList: User[] = [];

  constructor(
    protected userService: UserService,
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      console.log(data);
      this.userList = data;
    });
  }

}
