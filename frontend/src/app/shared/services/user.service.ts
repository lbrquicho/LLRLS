import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    usertype: '',
    firstname : '',
    middlename : '',
    lastname : '',
    department: '',
    position: '',
    email: '',
    password: ''
  };


  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  //HttpMethods

  postUser(user: User){
    return this.http.post(environment.apiBaseUrl+'/register',user,this.noAuthHeader);
  }

  login(authCredentials: any) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials,this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  }

  allUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/allUserProfile');
  }

  deleteUser(usersId: string,) {
    return this.http.delete(environment.apiBaseUrl + `/deleteUser/${usersId}`);
  }

  updateUserProfile(usersId: string, user: User){
    return this.http.patch(environment.apiBaseUrl + `/updateUserProfile/${usersId}`, user);
  }

  updateUserProfileWithoutPassword(usersId: string, user: User){
    return this.http.patch(environment.apiBaseUrl + `/updateUserProfileWithoutPassword/${usersId}`, user);
  }

  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}
