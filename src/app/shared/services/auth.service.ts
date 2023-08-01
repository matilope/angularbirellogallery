import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Global } from '@global/global';
import { User, UserObservable } from '@core/models/user';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { Validation } from '@core/models/validation';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public url: string;

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _cookieService: CookieService,
    @Inject(PLATFORM_ID) private platformId: object
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
      this._cookieService.delete(environment.token);
      this._router.navigate(['/admin/login']);
    }
  }

  getToken(): string | void {
    if (isPlatformBrowser(this.platformId)) {
      return this._cookieService.get(environment.token);
    }
  }
  cookieExists(): boolean {
    return this._cookieService.check(environment.token);
  }

  loggedIn(): Observable<Validation> {
    return this._http.get<Validation>(this.url + 'validation');
  }

}
