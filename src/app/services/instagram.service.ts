import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InstagramService {

    constructor(
        private _http: HttpClient

    ) {

    }

    getInstagram():Observable<any> {
        return this._http.get("https://graph.instagram.com/v1.0/17841403549294920/media?access_token=IGQVJWYno2d2RTei1uSGNTemdwU2tKZAjhUTWJia2J6bU5XX2dpLTd2WlYxdGxVbnNYdE00cG5vTkZAkLUhfa19GcTRKTUdsWkl5Q3dTSk4xUFZAZAMlVrQU9hZATJUUHBxdDM0TmhsTThHNW9JWDNORG5zYwZDZD&pretty=1&fields=caption%2Cmedia_url%2Cmedia_type%2Cpermalink%2Ctimestamp%2Cusername&limit=200")
    }
    
}