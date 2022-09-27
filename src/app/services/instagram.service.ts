import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Token } from '../models/token';
import { Global } from './global';
import { Instagram } from '../models/instagram';

@Injectable()
export class InstagramService {
  public token: string;
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  getTokens(): Observable<any> {
    return this._http.get(this.url + 'tokens');
  }

  getToken(tokenId: string): Observable<any> {
    return this._http.get(this.url + 'token/' + tokenId);
  }

  saveToken(token: Token): Observable<any> {
    let params = JSON.stringify(token);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'savetoken', params, { headers: headers, });
  }

  updateToken(id: string, token: Token): Observable<any> {
    let params = JSON.stringify(token);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url + 'token/' + id, params, { headers: headers, });
  }

  getInstagram(token: string): Observable<any> {
    return this._http.get(
      `https://graph.instagram.com/v1.0/17841403549294920/media?access_token=${token}&pretty=1&fields=caption%2Cmedia_url%2Cmedia_type%2Cpermalink%2Ctimestamp%2Cusername&limit=6`
    );
  }

  getInstagramNext(token: string, after:string): Observable<any> {
    return this._http.get(
      `https://graph.instagram.com/v1.0/17841403549294920/media?access_token=${token}&pretty=1&fields=caption%2Cmedia_url%2Cmedia_type%2Cpermalink%2Ctimestamp%2Cusername&limit=20&after=${after}`
    );
  }

}
