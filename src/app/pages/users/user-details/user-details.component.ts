import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  constructor(private _route: ActivatedRoute,
    private _user: UserService) { }

  user_id = null;
  user_data = null;

  getUserProfile() {
    this._user.userProfile(this.user_id).subscribe(
      response => {
        this.user_data = response;
      },
      error => {},
    );
  }

  ngOnInit() {
    this._route.params.subscribe(param => {
      this.user_id = param['id'];
      this.getUserProfile();
    });
  }

}
