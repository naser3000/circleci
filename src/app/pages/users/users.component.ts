import { Component, OnInit } from '@angular/core';
import { ManagerService } from 'src/app/services/manager.service';
import { AnnotatorService } from 'src/app/services/annotator.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private _manager: ManagerService,
    private _annotator: AnnotatorService) { }

  managerFields = {
    username: 'Username',
    fullname: 'Fullname',
    email: 'Email',
    status: 'Status',
    created_at: 'Joined',
    price: '$ / User'
  };
  annotatorFields = {
    username: 'Username',
    fullname: 'Fullname',
    email: 'Email',
    status: 'Status',
    created_at: 'Joined'
  };
  managersList: any = [];
  annotatorsList: any = [];

  selectedManagers = [];
  selectedAnnotators = [];

  addManagerModalShow = false;
  addAnnotatorModalShow = false;
  
  deletedCount = 0;
  deletedItemType = null;
  deleteModalShow = false;


  showDeleteModal(count, type) {
    this.deletedCount = count;
    this.deletedItemType = type;
    this.deleteModalShow = true;
  }

  closeDeleteModal() {
    this.deleteModalShow = false;
  }

  deleteSelectedItem() {
    const deleted = [];
    switch (this.deletedItemType) {
      case 'managers':
        this.managersList = this.managersList.filter(item => !this.selectedManagers.includes(item.id));
        this.selectedManagers = [];
        break;
      case 'annotators':
          this.annotatorsList = this.annotatorsList.filter(item => !this.selectedAnnotators.includes(item.id));
          this.selectedAnnotators = [];
        break;
      default:
        break;
      }
      this.closeDeleteModal();
  }

  addManager(value) {

  }

  addAnnotator(value) {

  }

  getManagerList() {
    this._manager.getAllManagers().subscribe(
      response => {
        this.managersList = response;
      },
      error => {}
    );
  }

  getAnnotatorList() {
    this._annotator.getAllAnnotators().subscribe(
      response => {
        this.annotatorsList = response;
      },
      error => {}
    );
  }

  ngOnInit() {
    this.getManagerList();
    this.getAnnotatorList();
  }

}
