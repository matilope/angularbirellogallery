import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Portrait, PortraitObservable, PortraitSingle } from '../models/portrait';
import { Global } from './global';

@Injectable()
export class PortraitService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  getPortraits(): Observable<PortraitObservable> {
    return this._http.get<PortraitObservable>(this.url + 'portraits');
  }

  getPortrait(portraitId: string): Observable<PortraitSingle> {
    return this._http.get<PortraitSingle>(this.url + 'portrait/' + portraitId);
  }

  updatePortrait(id: string, portrait: Portrait): Observable<PortraitObservable> {
    let params = JSON.stringify(portrait);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put<PortraitObservable>(this.url + 'portrait/' + id, params, { headers: headers, });
  }
}
