import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  private ROOT_URL = environment.rootURL + '/rest-auth/';

  loginUser(data) {
    return this._http.post(this.ROOT_URL + 'login/', data);
  }
  
  userInvitation(data) {
    return this._http.post(environment.rootURL + '/api/v1/invite-user/', data);
  }
  
  registerUser(data) {
    return this._http.post(environment.rootURL + '/api/v1/registration/', data);
  }
  
  registerKeyValidation(data) {
    return this._http.post(environment.rootURL + '/api/v1/check-invitation/', data);
  }

  logoutUser() {
    return this._http.post(this.ROOT_URL + 'logout/', {});
  }

  resetPassword(data) {
    return this._http.post(this.ROOT_URL + 'password/reset/', data);
  }

  confirmPassword(data) {
    return this._http.post(this.ROOT_URL + 'password/reset/confirm/', data);
  }

  getUserInfo() {
    return this._http.get(this.ROOT_URL + 'user/');
  }
}
