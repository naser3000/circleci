import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TagService } from 'src/app/services/tag.service';
import { ActivatedRoute } from '@angular/router';
import { ManagerService } from 'src/app/services/manager.service';
import { AnnotatorService } from 'src/app/services/annotator.service';
import { ProjectFileService } from 'src/app/services/project-file.service';
import { ProjectService } from 'src/app/services/project.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  constructor(private _route: ActivatedRoute,
    private _project: ProjectService,
    private _tag: TagService,
    private _auth: AuthService,
    private _proj_file: ProjectFileService,
    private _manager: ManagerService,
    private _annotator: AnnotatorService) { }
  
  project_id = null;
  project_details = null;
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
  managerList: any = [];
  annotatorList: any = [];


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
        const data = {
          annotator_ids: this.project_details.annotator_ids.filter(id => !this.selectedAnnotators.includes(id))
        };
        this._project.editProject(data, this.project_id).subscribe(
          response => {
            this.project_details = response;
            this.annotatorsList = response['annotators'];
            this.selectedAnnotators = [];
            this.deletedItemType = null;
            this.closeDeleteModal();
          },
          error => {},
        );
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
    if (!value) {
      return;
    }
    let data = {};
    if (this.addUserType === 'manager') {
      // this.availableUser = this.managerList;
      this.selectedManagers = [];
    } else if (this.addUserType === 'annotator') {
      if (value.invitation) {
        data = {
          email: value.email,
          type: 'A',
          related_id: this.project_id
        };
        this._auth.userInvitation(data).subscribe(
          response => {
            this.annotatorsList = [...this.annotatorsList, response];
          },
          error => {},
        );
      } else {
        data = {
          annotator_ids: [...this.project_details.annotator_ids, value.username]
        };
        this._project.editProject(data, this.project_id).subscribe(
          response => {
            this.project_details = response;
            this.annotatorsList = response['annotators'];
          },
          error => {},
        );
      }
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
      error => {
        this.uploadResult = 'failed';
      }
    );
    this.uploadResult = null;
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

  // getTagList() {
  //   this._tag.getAllTags().subscribe(
  //     response => {
  //       this.tags = response;
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }

  // getManagerList() {
  //   const filter = {
  //     groups: this.project_id
  //   };
  //   this._manager.getAllManagers().subscribe(
  //     (response: Array<any>) => {
  //       this.managersList = response;
  //     },
  //     error => {}
  //   );
  // }

  getAnnotatorList() {
    this._annotator.getAllAnnotators().subscribe(
      (response: Array<any>) => {
        this.annotatorList = response.map(annotator => {
          const data = {
            id: annotator.id,
            name: annotator.user.username
          };
          return data;
        });
      },
      error => {}
    );
  }

  // getProjectFileList() {
  //   this._proj_file.getAllProjectFiles().subscribe(
  //     response => {
  //       this.filesList = response;
  //     },
  //     error => {}
  //   );
  // }

  getProjectDetails() {
    this._project.getSingleProject(this.project_id).subscribe(
      response => {
        this.project_details = response;
        this.tags = response['tags'];
        this.annotatorsList = response['annotators'];
        this.filesList = response['files'];
      },
      error => {}
    );
  }

  ngOnInit() {
    // this.getTagList();
    // this.getManagerList();
    this.getAnnotatorList();
    // this.getProjectFileList();
    this._route.params.subscribe(param => {
      this.project_id = param['id'];
      this.getProjectDetails();
    });
  }

}
