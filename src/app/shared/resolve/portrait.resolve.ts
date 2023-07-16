import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PortraitObservable } from '@core/models/portrait';
import { PortraitService } from '@shared/services/portrait.service';

@Injectable({
  providedIn: 'root',
})
export class PortraitResolve implements Resolve<PortraitObservable | string> {

  constructor(private _portraitService: PortraitService) { }

  resolve(): Observable<PortraitObservable | string> {
    return this._portraitService.getPortrait("64a4cb571625dd0281b55429")
      .pipe(
        catchError(error => {
          return of('No data found');
        })
      );
  }
}
