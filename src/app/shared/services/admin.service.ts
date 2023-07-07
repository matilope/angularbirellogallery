import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '@global/global';
import { User } from '@core/models/user';

@Injectable()
export class AdminService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  getUsers(): Observable<User[]> {
    return this._http.get<User[]>(this.url + 'admin/users');
  }

  deleteUser(id: string): Observable<User> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete<User>(this.url + 'admin/user/' + id, { headers: headers });
  }
}
