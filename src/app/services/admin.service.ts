import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admins } from '../models/admin';
import { Global } from './global';

@Injectable()
export class AdminService {
    public url: string;

    constructor(
        private _http: HttpClient

    ) {
        this.url = Global.url;
    }


    getUsers():Observable<any> {
        return this._http.get(this.url+"admin/users");
    }

    deleteUser(id):Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(this.url+"admin/user/"+id, {headers: headers});
    }
    
}

