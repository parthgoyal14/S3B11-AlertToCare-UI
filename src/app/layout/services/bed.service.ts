import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Bed} from '../models/bed'
import { filter, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class BedService {

  private bedUrl: string;

  constructor(private http: HttpClient) { 
    this.bedUrl = 'http://localhost:8080/api/alerttocare/beds'
  }

  public getAllBedsForParticularIcu(icuId:string): Observable<Bed[]> {
    return this.http.get<Bed[]>(this.bedUrl).pipe(map(beds => beds.filter(bed => bed.icu.id == icuId)))
  }

  public changeMonitor(bedId, monitorId){
    return this.http.put(this.bedUrl+'/monitor/'+bedId+'/'+monitorId, {});
}

  //public save(labelAndBedCount: any): Observable<Bed> {
    //return this.http.post<Bed>(this.bedUrl, labelAndBedCount);
  //}
}
