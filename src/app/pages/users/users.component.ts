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
        this.selectedManagers.forEach((id, i) => {
          this._manager.deleteManager(id).subscribe(
            response => {
              deleted.push(id);
              if ( i === this.selectedManagers.length - 1 )  {
                this.handleDeleteResponse(deleted);
              }
            },
            error => {
              if ( i === this.selectedManagers.length - 1 )  {
                this.handleDeleteResponse(deleted);
              }
            }
          );
        });
        break;
      case 'annotators':
        this.selectedAnnotators.forEach((id, i) => {
          this._annotator.deleteAnnotator(id).subscribe(
            response => {
              deleted.push(id);
              if ( i === this.selectedAnnotators.length - 1 )  {
                this.handleDeleteResponse(deleted);
              }
            },
            error => {
              if ( i === this.selectedAnnotators.length - 1 )  {
                this.handleDeleteResponse(deleted);
              }
            }
          );
        });
        break;
      default:
        break;
    }
  }

  handleDeleteResponse(deleted_ids) {
    switch (this.deletedItemType) {
      case 'managers':
        this.managersList = this.managersList.filter(item => !deleted_ids.includes(item.id));
        this.selectedManagers = [];
        break;
      case 'annotators':
        this.annotatorsList = this.annotatorsList.filter(item => !deleted_ids.includes(item.id));
        this.selectedAnnotators = [];
        break;
      default:
        break;
    }
    this.deletedItemType = null;
    this.closeDeleteModal();
  }

  addManager(value) {
    if (!value) {
      return;
    }
    const data = {
      user: {
        username: value['username'],
        email: value['email'],
        first_name: value['firstName'],
        last_name: value['lastName'],
      },
      invite_status: value['status'],
      company_role: value['companyRole'],
      price_per_annotation: value['price']
    };
    this._manager.addNewManager(data).subscribe(
      response => {
        this.annotatorsList = [...this.managersList, response];
      },
      error => {}
    );
  }

  addAnnotator(value) {
    if (!value) {
      return;
    }
    const data = {
      user: {
        username: value['username'],
        email: value['email'],
        first_name: value['firstName'],
        last_name: value['lastName'],
      },
      invite_status: value['status'],
      company_role: value['companyRole'],
    };
    this._annotator.addNewAnnotator(data).subscribe(
      response => {
        this.annotatorsList = [...this.annotatorsList, response];
      },
      error => {}
    );
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
