import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ClientVisitService {
  private apiUrl = environment.clientVisitUrl; 
  private clientVisitCreateUrl = environment.clientVisitCreateUrl;
  private clientVisitGetByIdUrl = environment.clientVisitGetByIdUrl;
  private clientVisitUpdateByIdUrl = environment.clientVisitUpdateByIdUrl;

  constructor(private http: HttpClient) { }

  createClientVisit(newVisitData: any): Observable<any> {
    return this.http.post<any>(`${this.clientVisitCreateUrl}`, newVisitData);
  }

  updateClientVisit(clientVisitId: number, updatedVisitData: any): Observable<any> {
    return this.http.put<any>(`${this.clientVisitUpdateByIdUrl}/${clientVisitId}`, updatedVisitData);
  }

  getAllClientVisits() : Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  getClientVisitsById(clientVisitId: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.clientVisitGetByIdUrl}/${clientVisitId}`);
  }

  deleteClientVisitsById(clientVisitId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${clientVisitId}`);
  }
}
