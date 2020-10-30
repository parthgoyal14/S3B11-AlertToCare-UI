import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Occupancy} from '../models/occupancy'
import { filter, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class OccupancyService {

  private occupancyUrl: string;

  constructor(private http: HttpClient) { 
    this.occupancyUrl = 'http://localhost:8080/api/alerttocare/occupancies'
  }

  public getAllOccupanciesForParticularIcu(icuId:string): Observable<Occupancy[]> {
    return this.http.get<Occupancy[]>(this.occupancyUrl).pipe(map(occupancies => occupancies.filter(occupancy => occupancy.icu.id == icuId)))
  }

  public save(occupancy: any): Observable<Occupancy> {
    return this.http.post<Occupancy>(this.occupancyUrl, occupancy);
  }
}
