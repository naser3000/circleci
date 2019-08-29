import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss']
})
export class GroupDetailsComponent implements OnInit {

  constructor() { }
  
  deletedCount = 0;
  deletedItemType = null;
  deleteModalShow = false;
  addUserModalShow = false;
  selectedManagers = [];
  managerList: string[] = ['manager1', 'manager2', 'manager3', 'manager4', 'manager5'];
  managerFields = {
    username: 'Username',
    fullname: 'Fullname',
    email: 'Email',
    status: 'Status',
    created_at: 'Joined',
    price: '$ / User'
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

  showAddUserModal() {
    this.addUserModalShow = true;
  }

  showDeleteModal(count, type) {
    this.deletedCount = count;
    this.deletedItemType = type;
    this.deleteModalShow = true;
  }

  closeDeleteModal() {
    this.deleteModalShow = false;
  }

  deleteSelectedItem() {
    switch (this.deletedItemType) {
      case 'managers':
        this.managersList = this.managersList.filter(item => !this.selectedManagers.includes(item.id));
        this.selectedManagers = [];
        break;   
      default:
        break;
    }
    this.closeDeleteModal();
  }

  addUser() {
    this.selectedManagers = [];
    this.addUserModalShow = false;
  }

  ngOnInit() {
  }

}
