import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Paintings_Model } from '../models/paintings_model';
import { PaintingsService } from '../services/paintings.service';

@Injectable({
  providedIn: 'root',
})
export class PaintingResolveService implements Resolve<Paintings_Model> {
  
  constructor(activatedRoute: ActivatedRoute, private paintingService:PaintingsService) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let pinturaId = route.params['id'];

    // Getting specific painting

    return this.paintingService.getPainting(pinturaId)
      .pipe(
        catchError(error => {
          return of('No data found');
        })
      );
  }
}
