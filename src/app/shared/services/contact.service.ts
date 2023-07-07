import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '@global/global';
import { Contact } from '@core/models/contact';

@Injectable()
export class ContactService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  getContacts(body:Contact): Observable<Contact> {
    return this._http.post<Contact>(this.url + 'formulario', body);
  }
}
