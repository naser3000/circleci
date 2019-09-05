import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TagService } from 'src/app/services/tag.service';
import { ActivatedRoute } from '@angular/router';
import { ManagerService } from 'src/app/services/manager.service';
import { AnnotatorService } from 'src/app/services/annotator.service';
import { ProjectFileService } from 'src/app/services/project-file.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  constructor(private _route: ActivatedRoute,
    private _tag: TagService,
    private _proj_file: ProjectFileService,
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
    // dataset: 'Dataset',
    annotator: 'Annotator',
    // status: 'Status',
    created_at: 'Upload Date'
  };
  managersList : any = [];
  annotatorsList: any = [];
  filesList: any = [];

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
      case 'files':
        this.selectedFiles.forEach((file_id, i) => {
          this._proj_file.deleteProjectFile(file_id).subscribe(
            response => {
              deleted.push(file_id);
              if ( i === this.selectedFiles.length - 1 )  {
                this.handleDeleteResponse(deleted);
              }
            },
            error => {
              if ( i === this.selectedFiles.length - 1 )  {
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
      case 'files':
          this.filesList = this.filesList.filter(item => !deleted_ids.includes(item.id));
          this.selectedFiles = [];
        break;
      default:
        break;
    }
    this.deletedItemType = null;
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
    const data: FormData = new FormData();
    data.append('file', files.files[0]);
    data.append('project', this.project_id);
    this._proj_file.addNewProjectFile(data).subscribe(
      response => {
        this.filesList = [...this.filesList, response];
        this.selectedFiles = [];
        this.uploadResult = 'success';
      },
      error => {}
    );
    // this.selectedFiles = [];
    // if (files) {
    //   this.uploadResult = 'success';
    // }
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

  getProjectFileList() {
    this._proj_file.getAllProjectFiles().subscribe(
      response => {
        this.filesList = response;
      },
      error => {}
    );
  }

  ngOnInit() {
    this.getTagList();
    this.getManagerList();
    this.getAnnotatorList();
    this.getProjectFileList();
    this._route.params.subscribe(param => {
      this.project_id = param['id'];
    });
  }

}
