import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TagService } from 'src/app/services/tag.service';
import { ActivatedRoute } from '@angular/router';
import { ManagerService } from 'src/app/services/manager.service';
import { AnnotatorService } from 'src/app/services/annotator.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  constructor(private _route: ActivatedRoute,
    private _tag: TagService,
    private _manager: ManagerService,
    private _annotator: AnnotatorService) { }
  
  project_id = null;
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


  tags: any = [];
  inputVisible = false;
  inputValue = '';
  @ViewChild('inputElement') inputElement: ElementRef;
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
  managersList : any = [];
  annotatorsList: any = [];

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

  handleClose(removedTag): void {
    this._tag.deleteTag(removedTag.id).subscribe(
      response => {
        this.tags = this.tags.filter(tag => tag.id !== removedTag.id);
      },
      error => {}
    );
  }

  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 20;
    return isLongTag ? `${tag.slice(0, 20)}...` : tag;
  }

  showInput(): void {
    this.inputVisible = true;
    setTimeout(() => {
      this.inputElement.nativeElement.focus();
    }, 10);
  }

  handleInputConfirm(): void {
    if (this.inputValue && this.tags.indexOf(this.inputValue) === -1) {
      const data = {
        name: this.inputValue,
        project: this.project_id
      };

      this._tag.addNewTag(data).subscribe(
        response => {
          this.tags = [...this.tags, response];
        },
        error => {}
      );
    }
    this.inputValue = '';
    this.inputVisible = false;
  }

  getTagList() {
    this._tag.getAllTags().subscribe(
      response => {
        this.tags = response;
      },
      error => {
        console.log(error);
      }
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
    this.getTagList();
    this.getManagerList();
    this.getAnnotatorList();
    this._route.params.subscribe(param => {
      this.project_id = param['id'];
    });
  }

}
