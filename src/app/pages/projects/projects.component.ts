import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { GroupService } from 'src/app/services/group.service';
import { AnnotatorService } from 'src/app/services/annotator.service';
import { ProjectFileService } from 'src/app/services/project-file.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor(private _project: ProjectService,
    private _group: GroupService,
    private _auth: AuthService,
    private _annotator: AnnotatorService,
    private _proj_file: ProjectFileService) { }
  
  uploadResult = null;
  isModalVisible = false;
  addUserModalShow = false;
  addFileModalShow = false;
  addUserType = null;
  availableGroup: any = [];
  availableUser = [];
  selectedProjects = [];

  tableHeaderData: any = {
    name: 'Project Name',
    group_name: 'Group',
    description: 'Description',
    instruction: 'Instruction',
    deadline: 'Deadline',
  }

  projectsList: any = [];
  managerList: any = [];
  annotatorList: any = [];

  closeModal() {
    this.isModalVisible = false;
  }

  addProject(value) {
    console.log(value);
    const data = {
      name: value.projectName,
      group: value.group,
      description: value.description,
      instruction: value.instruction,
      deadline: value.deadline,
      tags: []
    };
    this._project.addNewProject(data).subscribe(
      response => {
        this.projectsList = [...this.projectsList, response];
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteProjects() {
    this.projectsList = this.projectsList.filter(item => !this.selectedProjects.includes(item.id));
    this.selectedProjects = [];
    this.closeModal();
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

  addUser(value) {
    if (!value) {
      return;
    }
    if (this.addUserType === 'manager') {
      // this.availableUser = this.managerList;
      this.selectedProjects = [];
    } else if (this.addUserType === 'annotator') {
      let data = {};
      const selectedP = this.projectsList.filter(project => this.selectedProjects.includes(project.id));
      if (value.invitation) {
        selectedP.forEach(project => {
          data = {
            email: value.email,
            type: 'A',
            related_id: project.id
          };
          this._auth.userInvitation(data).subscribe(
            response => {
              project['annotators'] = [...project['annotators'], response['id']];
            },
            error => {},
          );
        });
      } else {
        selectedP.forEach(project => {
          data = {
            annotator_ids: [...project.annotators, value.username]
          };
          this._project.editProject(data, project.id).subscribe(
            response => {
              project['annotators'] = response['annotator_ids'];
            },
            error => {},
          );
        });
      }
    }
    this.addUserType = null;
    this.addUserModalShow = false;
    this.availableUser = [];
    this.selectedProjects = [];
  }

  uploadFileToProject(files) {    
    if (files) {
      // let data = {};
      const selectedP = this.projectsList.filter(project => this.selectedProjects.includes(project.id));

      selectedP.forEach(project => {

        const data: FormData = new FormData();
        data.append('file', files.files[0]);
        data.append('project', project.id);
        data.append('data_type', files.type['xDataType']);
        data.append('curves_count', files.type['curveNumber']);
        data.append('is_horizontal', files.type['isHorizontal']);
        this._proj_file.addNewProjectFile(data).subscribe(
          response => {
            this.uploadResult = 'success';
          },
          error => {
            this.uploadResult = 'failed';
          }
        );
      });
      this.selectedProjects = [];
      this.uploadResult = null;
    }
      
  }

  getGroupList() {
    this._group.getAllGroups().subscribe(
      response => {
        this.availableGroup = response;
      },
      error => {}
    );
  }

  getProjectList() {
    this._project.getAllProjects().subscribe(
      response => {
        this.projectsList = response;
      },
      error => {
        console.log(error);
      }
    );
  }

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

  ngOnInit() {
    this.getGroupList();
    this.getProjectList();
    this.getAnnotatorList();
  }

}
