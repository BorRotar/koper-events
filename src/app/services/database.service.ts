import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ItemService {
  constructor(private http: HttpClient) {}

  getItem(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/items/${id}`).pipe(
      catchError(error => {
        console.error('Error while fetching data:', error);
        return throwError(error);
      })
    );
  }
}
