import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';

@Injectable()
export class ContactService {
    public url: string;

    constructor(
        private _http: HttpClient

    ) {
        this.url = Global.url;
    }


    getContacts(body):Observable<any> {
        return this._http.post(this.url+"formulario", body);
    }
    
}

