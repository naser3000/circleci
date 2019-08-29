import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor(private _project: ProjectService,
    private _group: GroupService) { }
  
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

  managerList: string[] = ['manager1', 'manager2', 'manager3', 'manager4', 'manager5'];
  annotatorList: string[] = ['annotator1', 'annotator2', 'annotator3', 'annotator4', 'annotator5'];

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
    console.log(value);
    if (this.addUserType === 'manager') {
      // this.availableUser = this.managerList;
    } else if (this.addUserType === 'annotator') {
      // this.availableUser = this.annotatorList;
    }
    this.addUserType = null;
    this.addUserModalShow = false;
    this.selectedProjects = [];
    this.availableUser = [];
  }

  uploadFileToProject(files) {
    this.selectedProjects = [];
    if (files) {
      this.uploadResult = 'success';
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

  ngOnInit() {
    this.getGroupList();
    this.getProjectList();
  }

}
