import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor() { }

  tableHeaderData: any = {
    name: 'Name',
    group: 'Group',
    description: 'Description',
    instruction: 'Instruction',
    deadline: 'Deadline',
  }

  projectsList: Array<any> = [
    {
      id: '1',
      name: 'John Brown',
      group: 'group 1',
      description: 'Description',
      instruction: 'Instruction',
      deadline: new Date()
    },
    {
      id: '2',
      name: 'Jim Green',
      group: 'group 2',
      description: 'Description',
      instruction: 'Instruction',
      deadline: new Date()
    },
    {
      id: '3',
      name: 'Joe Black',
      group: 'group 3',
      description: 'Description',
      instruction: 'Instruction',
      deadline: new Date()
    },
    {
      id: '4',
      name: 'Jim Red',
      group: 'group 4',
      description: 'Description',
      instruction: 'Instruction',
      deadline: new Date()
    },
    {
      id: '5',
      name: 'Jim Red',
      group: 'group 5',
      description: 'Description',
      instruction: 'Instruction',
      deadline: new Date()
    },
    {
      id: '6',
      name: 'Jim Red',
      group: 'group 6',
      description: 'Description',
      instruction: 'Instruction',
      deadline: new Date()
    },
    {
      id: '7',
      name: 'Jim Red',
      group: 'group 7',
      description: 'Description',
      instruction: 'Instruction',
      deadline: new Date()
    },
    {
      id: '8',
      name: 'Jim Red',
      group: 'group 8',
      description: 'Description',
      instruction: 'Instruction',
      deadline: new Date()
    },
    {
      id: '9',
      name: 'Jim Red',
      group: 'group 9',
      description: 'Description',
      instruction: 'Instruction',
      deadline: new Date()
    },
    {
      id: '10',
      name: 'Jim Red',
      group: 'group 10',
      description: 'Description',
      instruction: 'Instruction',
      deadline: new Date()
    },
    {
      id: '11',
      name: 'Jim Red',
      group: 'group 11',
      description: 'Description',
      instruction: 'Instruction',
      deadline: new Date()
    },
  ];

  ngOnInit() {
  }

}
