import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admins } from '../models/admin';
import { Global } from './global';

@Injectable()
export class AdminService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }


  getUsers(): Observable<Users> {
    return this._http.get<Users>(this.url + 'admin/users');
  }

  deleteUser(id: string): Observable<Users> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete<Users>(this.url + 'admin/user/' + id, { headers: headers });
  }
}
export interface Users {
  users: DataUser[]
}

export interface DataUser {
  _id: string, email: string, password: string
}