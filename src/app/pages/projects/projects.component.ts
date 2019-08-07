import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor() { }
  
  uploadResult = null;
  isModalVisible = false;
  addUserModalShow = false;
  addUserType = null;
  availableUser = [];
  selectedProjects = [];

  tableHeaderData: any = {
    projectName: 'Project Name',
    group: 'Group',
    description: 'Description',
    instruction: 'Instruction',
    deadline: 'Deadline',
  }

  projectsList: Array<any> = [
    {
      id: '1',
      projectName: 'John Brown',
      group: 'group 1',
      description: 'Description',
      instruction: 'Instruction',
      deadline: new Date()
    },
    {
      id: '2',
      projectName: 'Jim Green',
      group: 'group 2',
      description: 'Description',
      instruction: 'Instruction',
      deadline: new Date()
    },
    {
      id: '3',
      projectName: 'Joe Black',
      group: 'group 3',
      description: 'Description',
      instruction: 'Instruction',
      deadline: new Date()
    },
    {
      id: '4',
      projectName: 'Jim Red',
      group: 'group 4',
      description: 'Description',
      instruction: 'Instruction',
      deadline: new Date()
    },
    {
      id: '5',
      projectName: 'Jim Red',
      group: 'group 5',
      description: 'Description',
      instruction: 'Instruction',
      deadline: new Date()
    },
    {
      id: '6',
      projectName: 'Jim Red',
      group: 'group 6',
      description: 'Description',
      instruction: 'Instruction',
      deadline: new Date()
    },
    {
      id: '7',
      projectName: 'Jim Red',
      group: 'group 7',
      description: 'Description',
      instruction: 'Instruction',
      deadline: new Date()
    },
    {
      id: '8',
      projectName: 'Jim Red',
      group: 'group 8',
      description: 'Description',
      instruction: 'Instruction',
      deadline: new Date()
    },
    {
      id: '9',
      projectName: 'Jim Red',
      group: 'group 9',
      description: 'Description',
      instruction: 'Instruction',
      deadline: new Date()
    },
    {
      id: '10',
      projectName: 'Jim Red',
      group: 'group 10',
      description: 'Description',
      instruction: 'Instruction',
      deadline: new Date()
    },
    {
      id: '11',
      projectName: 'Jim Red',
      group: 'group 11',
      description: 'Description',
      instruction: 'Instruction',
      deadline: new Date()
    },
  ];

  managerList: string[] = ['manager1', 'manager2', 'manager3', 'manager4', 'manager5'];
  annotatorList: string[] = ['annotator1', 'annotator2', 'annotator3', 'annotator4', 'annotator5'];

  closeModal() {
    this.isModalVisible = false;
  }
  addProject(value) {
    value['id'] = this.projectsList.length + 1;
    this.projectsList = [...this.projectsList, value];
  }
  deleteProjects() {
    this.projectsList = this.projectsList.filter(item => !this.selectedProjects.includes(item.id));
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
    this.uploadResult = 'success';
  }

  ngOnInit() {
  }

}
