import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { InstagramService } from '@shared/services/instagram.service';
import { TokenObservable } from '@core/models/token';

@Injectable({
  providedIn: 'root',
})
export class TokenResolveService implements Resolve<TokenObservable | string> {

  constructor(private _tokenService: InstagramService) { }

  resolve(): Observable<TokenObservable | string> {
    return this._tokenService.getToken('625b1c29ac7355062c33afe1').pipe(
      catchError(error => {
        return of('No data found');
      })
    );
  }
}
