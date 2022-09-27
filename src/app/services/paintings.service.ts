import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paintings } from '../models/paintings';
import { Global } from './global';
import { Paintings_Model, Paintings_Deleteimg } from '../models/paintings_model';

@Injectable()
export class PaintingsService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  getPaintings(): Observable<Paintings_Model> {
    return this._http.get<Paintings_Model>(this.url + 'paintings/?page=1&limit=100');
  }

  getPaintingsPagination(page: number): Observable<Paintings_Model> {
    return this._http.get<Paintings_Model>(`${this.url}paintings/?page=${page}&limit=6`);
  }

  getPainting(pinturaId: string): Observable<Paintings_Model> {
    return this._http.get<Paintings_Model>(this.url + 'painting/' + pinturaId);
  }

  create(pintura: Paintings): Observable<Paintings_Model> {
    let params = JSON.stringify(pintura);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post<Paintings_Model>(this.url + 'save', params, { headers: headers, });
  }

  update(id: string, pintura: Paintings): Observable<Paintings_Model> {
    let params = JSON.stringify(pintura);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put<Paintings_Model>(this.url + 'painting/' + id, params, { headers: headers });
  }

  delete(id: string): Observable<Paintings_Model> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete<Paintings_Model>(this.url + 'painting/' + id, { headers: headers, });
  }

  deleteImg(pintura: Paintings, index: number): Observable<Paintings_Deleteimg> {
    let params = JSON.stringify(pintura);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post<Paintings_Deleteimg>(this.url + 'deleteimg', {params, index},  { headers: headers, });
  }

}
