import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paintings } from '../models/paintings';
import { Global } from './global';

@Injectable()
export class PaintingsService {
    public url: string;

    constructor(
        private _http: HttpClient

    ) {
        this.url = Global.url;
    }


    getPaintings():Observable<any> {
        return this._http.get(this.url+"paintings");
    }

    getPainting(pinturaId):Observable<any> {
        return this._http.get(this.url+"painting/"+pinturaId);
    }

    create(pintura):Observable<any> {
        let params = JSON.stringify(pintura);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url+"save", params, {headers: headers});
        
    }

    update(id, pintura):Observable<any> {
        let params = JSON.stringify(pintura);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url+"painting/"+id, params, {headers: headers}); 
    }

    delete(id):Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(this.url+"painting/"+id, {headers: headers});
    }
    
}

