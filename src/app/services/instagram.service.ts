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
        return this._http.get("https://graph.instagram.com/v1.0/17841403549294920/media?access_token=************************&pretty=1&fields=caption%2Cmedia_url%2Cmedia_type%2Cpermalink%2Ctimestamp%2Cusername&limit=200")
    }
    
}
