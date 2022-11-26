import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Global } from './global';
import { User } from '../models/user';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class AuthService {
  public url: string;

  constructor(
    private _http: HttpClient,
    private _router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.url = Global.url;
  }

  registerUser(user: User) {
<<<<<<< HEAD
    if (user.secret == environment.secret) {
=======
    if (user.secret == '*****************') {
>>>>>>> 8ae8305c4f13b5cd43396b3f239a78c2d110c35c
      return this._http.post<User>(this.url + 'register', user);
    }
  }

  loginUser(user: User) {
<<<<<<< HEAD
    if (user.secret == environment.secret) {
=======
    if (user.secret == '*****************') {
>>>>>>> 8ae8305c4f13b5cd43396b3f239a78c2d110c35c
      return this._http.post<User>(this.url + 'login', user);
    }
  }

  logoutUser() {
    if (isPlatformBrowser(this.platformId)) {
<<<<<<< HEAD
      localStorage.removeItem(environment.token);
=======
      localStorage.removeItem('**********');
>>>>>>> 8ae8305c4f13b5cd43396b3f239a78c2d110c35c
      this._router.navigate(['/admin/login']);
    }
  }

  getToken() {
    if (isPlatformBrowser(this.platformId)) {
<<<<<<< HEAD
      return localStorage.getItem(environment.token);
=======
      return localStorage.getItem('**********');
>>>>>>> 8ae8305c4f13b5cd43396b3f239a78c2d110c35c
    }
  }

  loggedIn() {
    if (isPlatformBrowser(this.platformId)) {
<<<<<<< HEAD
      return !!localStorage.getItem(environment.token);
=======
      return !!localStorage.getItem('**********');
>>>>>>> 8ae8305c4f13b5cd43396b3f239a78c2d110c35c
    }
  }

}
