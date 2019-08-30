import { Component, OnInit } from '@angular/core';
import { ManagerService } from 'src/app/services/manager.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private _manager: ManagerService) { }

  managerFields = {
    username: 'Username',
    fullname: 'Fullname',
    email: 'Email',
    status: 'Status',
    created_at: 'Joined',
    price: '$ / User'
  };
  anotatorFields = {
    username: 'Username',
    fullname: 'Fullname',
    email: 'Email',
    status: 'Status',
    created_at: 'Joined'
  };
  managersList: any = [];
  anotatorsList: any = [];

  getManagerList() {
    this._manager.getAllManagers().subscribe(
      response => {
        this.managersList = response;
      },
      error => {}
    );
  }

  ngOnInit() {
    this.getManagerList();
  }

}
