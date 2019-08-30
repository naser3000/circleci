import { Component, OnInit } from '@angular/core';
import { ManagerService } from 'src/app/services/manager.service';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss']
})
export class GroupDetailsComponent implements OnInit {

  constructor(private _manager: ManagerService) { }
  
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
  managersList: any = [];

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
