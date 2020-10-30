import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Monitor } from '../models/monitor'

@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  private monitorUrl: string;

  constructor(private http: HttpClient) {
    this.monitorUrl = 'http://localhost:8080/api/alerttocare/monitors'
  }

  public getAllMonitors(): Observable<Monitor[]> {
    return this.http.get<Monitor[]>(this.monitorUrl);
  }

  public save(monitor: any): Observable<Monitor> {
    return this.http.post<Monitor>(this.monitorUrl, monitor);
  }

  public sendVitals(monitor: any) {
    return this.http.put(this.monitorUrl + '/' + monitor.id, monitor);
  }
  //public deletePatient(patientId){
  //return this.http.delete(this.patientUrl+'/'+patientId);
  //}

}