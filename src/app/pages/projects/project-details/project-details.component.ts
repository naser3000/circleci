import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  constructor() { }

  managerFields = {
    username: 'Username',
    fullname: 'Fullname',
    email: 'Email',
    status: 'Status',
    created_at: 'Joined',
    price: '$ / User'
  };
  anotatorFields = {
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
  anotatorsList = [
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
      name: 'csv_file_1',
      dataset: 'dataset_1',
      annotator: 'annotator_1',
      status: 'accepted',
      created_at: new Date()
    },
    {
      name: 'csv_file_2',
      dataset: 'dataset_1',
      annotator: 'annotator_2',
      status: 'accepted',
      created_at: new Date()
    },
    {
      name: 'csv_file_3',
      dataset: 'dataset_2',
      annotator: 'annotator_2',
      status: 'understood',
      created_at: new Date()
    },
    {
      name: 'csv_file_4',
      dataset: 'dataset_3',
      annotator: 'annotator_3',
      status: 'accepted',
      created_at: new Date()
    },
  ]

  ngOnInit() {
  }

}
