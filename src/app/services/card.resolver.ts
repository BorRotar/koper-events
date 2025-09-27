import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SwapiService } from './swapi';
import { CardData } from '../components/card/card';
import {ItemService} from './database.service';

@Injectable({
  providedIn: 'root'
})
export class CardResolver implements Resolve<{ cardData: CardData | null }> {
  constructor(private swapiService: SwapiService, private itemService: ItemService) {}  // Injected itemService here

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ cardData: CardData | null }> {
    const id = route.paramMap.get('id');
    console.log('Resolving data for ID:', id);
    if (id) {
      // Use forkJoin to make parallel requests
      const requests = forkJoin({
        vehicle: this.swapiService.getResource('vehicles', id),
        item: this.itemService.getItem(+id), // Added item service request
      });

      return requests.pipe(
        map(data => {
          console.log('Data received from APIs:', data);
          return { cardData: { ...data.vehicle, ...data.item } };   // Combine data from both services
        }),
        catchError((error) => {
          console.error('Data retrieval failed for ID:', id, error);
          return of({ cardData: null });
        })
      );
    } else {
      console.warn('No ID found in route parameters.');
      return of({ cardData: null });
    }
  }
}
