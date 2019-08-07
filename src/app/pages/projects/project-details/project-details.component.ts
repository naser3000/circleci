import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  constructor() { }

  uploadResult = null;
  isModalVisible = false;
  addUserModalShow = false;
  addFileModalShow = false;
  deleteModalShow = false;
  deletedCount = null;
  deletedItemType = null;
  addUserType = null;
  availableUser = [];
  selectedManagers = [];
  selectedAnnotators = [];
  selectedFiles = [];


  managerList: string[] = ['manager1', 'manager2', 'manager3', 'manager4', 'manager5'];
  annotatorList: string[] = ['annotator1', 'annotator2', 'annotator3', 'annotator4', 'annotator5'];


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
  fileFields = {
    name: 'File Name',
    dataset: 'Dataset',
    annotator: 'Annotator',
    status: 'Status',
    created_at: 'Upload Date'
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
  annotatorsList = [
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

  filesList = [
    {
      id: 1,
      name: 'csv_file_1',
      dataset: 'dataset_1',
      annotator: 'annotator_1',
      status: 'accepted',
      created_at: new Date()
    },
    {
      id: 2,
      name: 'csv_file_2',
      dataset: 'dataset_1',
      annotator: 'annotator_2',
      status: 'accepted',
      created_at: new Date()
    },
    {
      id: 3,
      name: 'csv_file_3',
      dataset: 'dataset_2',
      annotator: 'annotator_2',
      status: 'understood',
      created_at: new Date()
    },
    {
      id: 4,
      name: 'csv_file_4',
      dataset: 'dataset_3',
      annotator: 'annotator_3',
      status: 'accepted',
      created_at: new Date()
    },
  ];

  closeDeleteModal() {
    this.deleteModalShow = false;
  }

  showAddUserModal(type) {
    this.addUserModalShow = true;
    this.addUserType = type
    if (type === 'manager') {
      this.availableUser = this.managerList;
    } else if (type === 'annotator') {
      this.availableUser = this.annotatorList;
    }
  }

  showDeleteModal(count, type) {
    this.deletedCount = count;
    this.deletedItemType = type;
    this.deleteModalShow = true;
  }

  deleteSelectedItem() {
    switch (this.deletedItemType) {
      case 'managers':
        this.managersList = this.managersList.filter(item => !this.selectedManagers.includes(item.id));
        this.selectedManagers = [];
        break;
      case 'annotators':
        this.annotatorsList = this.annotatorsList.filter(item => !this.selectedAnnotators.includes(item.id));
        this.selectedAnnotators = [];
        break;
      case 'files':
        this.filesList = this.filesList.filter(item => !this.selectedFiles.includes(item.id));
        this.selectedFiles = [];
        break;
    
      default:
        break;
    }
    this.closeDeleteModal();
  }

  addUser(value) {
    if (this.addUserType === 'manager') {
      // this.availableUser = this.managerList;
      this.selectedManagers = [];
    } else if (this.addUserType === 'annotator') {
      // this.availableUser = this.annotatorList;
      this.selectedAnnotators = [];
    }
    this.addUserType = null;
    this.addUserModalShow = false;
    this.availableUser = [];
  }

  uploadFileToProject(files) {
    this.selectedFiles = [];
    if (files) {
      this.uploadResult = 'success';
    }
  }

  ngOnInit() {
  }

}
