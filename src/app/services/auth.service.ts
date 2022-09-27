import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Global } from './global';
import { User } from '../models/user';

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
    if (user.secret == 'secretbirellogallerypasswordtoken9730') {
      return this._http.post<User>(this.url + 'register', user);
    }
  }

  loginUser(user: User) {
    if (user.secret == 'secretbirellogallerypasswordtoken9730') {
      return this._http.post<User>(this.url + 'login', user);
    }
  }

  logoutUser() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token_birello_gallery_admin');
      this._router.navigate(['/admin/login']);
    }
  }

  getToken() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token_birello_gallery_admin');
    }
  }

  loggedIn() {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token_birello_gallery_admin');
    }
  }

}
