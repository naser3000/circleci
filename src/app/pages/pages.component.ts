import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor(private _shared: SharedService,
    private _router: Router) { }

  currentUser;
  isCollapsed = false;

  logoutUser() {
    this._shared.changeUser(null);
    this._router.navigate(['./login']);
  }

  getUserInfo() {
    this._shared.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.getUserInfo();
  }

}
