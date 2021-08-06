import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Portrait } from '../models/portrait';
import { Global } from './global';

@Injectable()
export class PortraitService {
    public url: string;

    constructor(
        private _http: HttpClient

    ) {
        this.url = Global.url;
    }

    getPortraits():Observable<any> {
        return this._http.get(this.url+"portraits");
    }

    getPortrait(portraitId):Observable<any> {
        return this._http.get(this.url+"portrait/"+portraitId);
    }

    updatePortrait(id, portrait):Observable<any> {
        let params = JSON.stringify(portrait);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url+"portrait/"+id, params, {headers: headers}); 
    }

}

