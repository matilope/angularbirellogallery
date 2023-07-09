import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PaintingsObservable } from '@core/models/painting';
import { PaintingsService } from '@shared/services/paintings.service';

@Injectable({
  providedIn: 'root'
})
export class PaintingsResolveService implements Resolve<PaintingsObservable | string> {

  constructor(private paintingService: PaintingsService) { }

  resolve(): Observable<PaintingsObservable | string> {
    return this.paintingService.getPaintings()
      .pipe(
        catchError(error => {
          return of('No data found');
        })
      );
  }
}
