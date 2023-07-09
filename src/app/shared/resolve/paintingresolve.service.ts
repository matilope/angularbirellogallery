import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PaintingObservable } from '@core/models/painting';
import { PaintingsService } from '@shared/services/paintings.service';

@Injectable({
  providedIn: 'root',
})
export class PaintingResolveService implements Resolve<PaintingObservable | string> {

  constructor(private paintingService: PaintingsService) { }

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<PaintingObservable | string> {
    let pinturaId = route.params['id'];
    return this.paintingService.getPainting(pinturaId)
      .pipe(
        catchError(error => {
          return of('No data found');
        })
      );
  }
}
