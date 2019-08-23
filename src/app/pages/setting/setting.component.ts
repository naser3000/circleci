import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  constructor() { }

  selectedGroups = [];
  deletedCount = 0;
  deletedItemType = null;
  addGroupModalShow = false;
  deleteModalShow = false;
  groupFields = {
    name: 'Group Name',
    projects: 'Project(s)',
    managers: 'Manager(s)',
  };
  groupsList = [
    {
      id: 1,
      name: 'Group 1',
      projects: 3,
      managers: 15,
    },
    {
      id: 2,
      name: 'Group 2',
      projects: 2,
      managers: 8,
    },
    {
      id: 3,
      name: 'Group 3',
      projects: 5,
      managers: 19,
    },
    {
      id: 4,
      name: 'Group 4',
      projects: 1,
      managers: 4,
    },
  ];

  addGroup(value) {
    this.selectedGroups = [];
    this.addGroupModalShow = false;
  }

  deleteSelectedItem() {
    this.groupsList = this.groupsList.filter(item => !this.selectedGroups.includes(item.id));
    this.selectedGroups = [];
    this.closeDeleteModal();
  }

  showDeleteModal(count, type) {
    this.deletedCount = count;
    this.deletedItemType = type;
    this.deleteModalShow = true;
  }

  closeDeleteModal() {
    this.deleteModalShow = false;
  }
  

  ngOnInit() {
  }

}
