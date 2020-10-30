import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Patient} from '../models/patient'

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private patientUrl: string;

  constructor(private http: HttpClient) { 
    this.patientUrl = 'http://localhost:8080/api/alerttocare/patients'
  }

  public getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.patientUrl);
  }

  public save(patient: any): Observable<Patient> {
    return this.http.post<Patient>(this.patientUrl, patient);
  }

  public deletePatient(patientId){
    return this.http.delete(this.patientUrl+'/'+patientId);
  }

}
