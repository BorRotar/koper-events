import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SwapiService } from './swapi';
import { CardData } from '../components/card/card';

@Injectable({
  providedIn: 'root'
})
export class CardResolver implements Resolve<{ cardData: CardData | null }> {
  constructor(private swapiService: SwapiService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ cardData: CardData | null }> {
    const id = route.paramMap.get('id');
    console.log('Resolving data for ID:', id);  // Log the ID being resolved
    if (id) {
      return this.swapiService.getResource('vehicles', id).pipe(
        map(data => {
          console.log('Data received from API for vehicle:', data);  // Log successful data fetch
          return { cardData: data };
        }),
        catchError((error) => {
          console.error('Data retrieval failed for ID:', id, error);  // Log error details along with the ID
          return of({ cardData: null });
        })
      );
    } else {
      console.warn('No ID found in route parameters.');  // Warning log if no ID is found
      return of({ cardData: null });
    }
  }
}
