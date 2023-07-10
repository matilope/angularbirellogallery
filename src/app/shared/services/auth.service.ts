import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Global } from '@global/global';
import { User, UserObservable } from '@core/models/user';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

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

  registerUser(user: User): Observable<UserObservable> {
    return this._http.post<UserObservable>(this.url + 'register', user);
  }

  loginUser(user: User): Observable<UserObservable> {
    return this._http.post<UserObservable>(this.url + 'login', user);
  }

  logoutUser(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(environment.token);
      this._router.navigate(['/admin/login']);
    }
  }

  getToken(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(environment.token);
    }
  }

  loggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem(environment.token);
    }
  }

}
