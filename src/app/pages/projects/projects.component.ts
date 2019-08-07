import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor() { }
  
  isModalVisible = false;
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

  getSelectedItem(e) {
    this.selectedProjects = [...e];
  }

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

  ngOnInit() {
  }

}
