import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Icu} from '../models/icu'

@Injectable({
  providedIn: 'root'
})
export class IcuService {

  private icuUrl: string;

  constructor(private http: HttpClient) { 
    this.icuUrl = 'http://localhost:8080/api/alerttocare/icus'
  }

  public getAllIcus(): Observable<Icu[]> {
    return this.http.get<Icu[]>(this.icuUrl);
  }

  public save(labelAndBedCount: any): Observable<Icu> {
    return this.http.post<Icu>(this.icuUrl, labelAndBedCount);
  }

}
