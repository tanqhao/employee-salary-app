import { Component, OnInit } from '@angular/core';

import { UserService } from './user.service';
import { User } from './user.model';

import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  userList: User[] = [];

  salaryMin: FormControl;
  salaryMax: FormControl;
  sortBy: FormControl;
  desc: FormControl;
  limit: FormControl;
  offset: FormControl

  constructor(
    protected userService: UserService,
  ) {
    this.salaryMin = new FormControl(0);
    this.salaryMax = new FormControl(10000);
    this.sortBy = new FormControl('id');
    this.desc = new FormControl(false);
    this.limit = new FormControl(30);
    this.offset = new FormControl(0);
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.userList = data;
    });
  }

  searchHandler(): void {

    let sortValue;

    (this.desc.value) ? sortValue = `-${this.sortBy.value}` :
    sortValue = `+${this.sortBy.value}`

    this.userService.getUsersFilter
    (this.salaryMin.value, this.salaryMax.value, sortValue, this.limit.value, this.offset.value).subscribe(data => {
      this.userList = data;
    });
  }

}
