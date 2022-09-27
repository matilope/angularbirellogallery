import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { InstagramService } from '../services/instagram.service';
import { Token } from '../models/token';

@Injectable({
  providedIn: 'root',
})
export class TokenResolveService implements Resolve<Token> {
  public tokenId: string = '625b1c29ac7355062c33afe1';
  constructor(private token: InstagramService) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.token.getToken(this.tokenId).pipe(
      catchError(error => {
        return of('No data found');
      })
    );
  }
}
