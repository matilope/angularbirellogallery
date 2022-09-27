import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Paintings_Model } from '../models/paintings_model';
import { PaintingsService } from '../services/paintings.service';

@Injectable({
  providedIn: 'root', // chequear
})
export class PaintingsResolveService implements Resolve<Paintings_Model> {
  
  constructor(private activatedRoute: ActivatedRoute, private paintingService:PaintingsService) {
  }

  // Getting paintings

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.paintingService.getPaintings()
      .pipe(
        catchError(error => {
          return of('No data found');
        })
      );
  }
}
