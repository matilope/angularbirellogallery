import { Injectable, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { Global } from './global';

@Injectable()
export class AuthService {

  public url: string;
  
  constructor(private http: HttpClient,
              private _router: Router,
              @Inject(PLATFORM_ID) private platformId: Object) {
                this.url = Global.url
               }

  registerUser(user) {
    if(user.secret == "secretbirellogallerypasswordtoken9730"){
    return this.http.post<any>(this.url+"register", user);
  }
  }

  loginUser(user) {
    return this.http.post<any>(this.url+"login", user);
  }

  logoutUser() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      this._router.navigate(['/admin/login']);
  }
  }

  getToken() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
   }
  }

  loggedIn() {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token'); 
   }
  }
}