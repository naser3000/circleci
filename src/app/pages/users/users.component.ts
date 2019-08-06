import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor() { }

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
  managersList = [
    {
      id: 1,
      username: 'Username',
      fullname: 'John Brown',
      email: 'John.Brown@gmail.com',
      status: 'active',
      created_at: new Date(),
      price: '20'
    },
    {
      id: 2,
      username: 'Username',
      fullname: 'Jim Green',
      email: 'Jim.Green@gmail.com',
      status: 'canceled',
      created_at: new Date(),
      price: '10'
    },
    {
      id: 3,
      username: 'Username',
      fullname: 'Joe Black',
      email: 'Joe.Black@gmail.com',
      status: 'hold',
      created_at: new Date(),
      price: '15'
    },
    {
      id: 4,
      username: 'Username',
      fullname: 'Jim Red',
      email: 'Jim.Red@gmail.com',
      status: 'removed',
      created_at: new Date(),
      price: '3'
    },
  ];
  anotatorsList = [
    {
      id: 1,
      username: 'Username',
      fullname: 'John Brown',
      email: 'John.Brown@gmail.com',
      status: 'active',
      created_at: new Date(),
    },
    {
      id: 2,
      username: 'Username',
      fullname: 'Jim Green',
      email: 'Jim.Green@gmail.com',
      status: 'canceled',
      created_at: new Date(),
    },
    {
      id: 3,
      username: 'Username',
      fullname: 'Joe Black',
      email: 'Joe.Black@gmail.com',
      status: 'hold',
      created_at: new Date(),
    },
    {
      id: 4,
      username: 'Username',
      fullname: 'Jim Red',
      email: 'Jim.Red@gmail.com',
      status: 'removed',
      created_at: new Date(),
    },
  ];

  ngOnInit() {
  }

}
