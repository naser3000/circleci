import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    constructor() { }

    userProjects = [
        {
            id: 1,
            name: 'Project 1',
            desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing ...'
        },
        {
            id: 2,
            name: 'Project 2',
            desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing ...'
        },
        {
            id: 3,
            name: 'Project 3',
            desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing ...'
        },
        {
            id: 3,
            name: 'Project 3',
            desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing ...'
        },
        {
            id: 4,
            name: 'Project 4',
            desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing ...'
        },
        {
            id: 5,
            name: 'Project 5',
            desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing ...'
        },
    ];
 
    ngOnInit() {

    }

}
