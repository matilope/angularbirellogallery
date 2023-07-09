import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '@global/global';
import { Painting, PaintingsObservable, PaintingObservable } from '@core/models/painting';

@Injectable()
export class PaintingsService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  getPaintings(): Observable<PaintingsObservable> {
    return this._http.get<PaintingsObservable>(this.url + 'paintings/?page=1&limit=100');
  }

  getPaintingsPagination(page: number): Observable<PaintingsObservable> {
    return this._http.get<PaintingsObservable>(`${this.url}paintings/?page=${page}&limit=6`);
  }

  getPainting(pinturaId: string): Observable<PaintingObservable> {
    return this._http.get<PaintingObservable>(this.url + 'painting/' + pinturaId);
  }

  save(body: FormData): Observable<PaintingObservable> {
    return this._http.post<PaintingObservable>(this.url + 'save', body);
  }

  update(id: string, pintura: Painting): Observable<PaintingObservable> {
    let body = JSON.stringify(pintura);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put<PaintingObservable>(this.url + 'painting/' + id, body, { headers: headers });
  }

  delete(id: string): Observable<PaintingObservable> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete<PaintingObservable>(this.url + 'painting/' + id, { headers: headers, });
  }

  deleteImg(pintura: Painting, index: number): Observable<PaintingObservable> {
    let body = JSON.stringify(pintura);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post<PaintingObservable>(this.url + 'delete_image', { body, index }, { headers: headers, });
  }
}
