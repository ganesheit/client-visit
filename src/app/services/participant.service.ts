import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  apiUrl = environment.participantsUrl;

  constructor(private http: HttpClient) {}

  getAllParticipants(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getAllParticipantById(participantId: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${participantId}`);
  }

  getParticipantByClientId(clientId: any): Observable<any[]> {
    const url = environment.prod || environment.staging
      ? `${environment.getParticipantByClientIdUrl}/clientVisit/${clientId}`
      : 'assets/json/participants/get-participant-by-id.json';
    return this.http.get<any[]>(url);
  }

  createParticipant(participantData: any, clientVisitId: any): Observable<any> {
    const httpParams = new HttpParams().set('clientVisitId', clientVisitId);
    const options = { params: httpParams };
    return this.http.post<any>(`${this.apiUrl}`,participantData, options );
  }

  updateParticipant(participantId: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${participantId}`, data);
  }

  deleteParticipant(participantId: number): Observable<any> {
    if (environment.prod || environment.staging) {
      return this.http.delete<any>(`${this.apiUrl}/${participantId}`);
    } else {
      return of({ status: 200, message: 'Delete operation in development was successful.' });
    }
  }
}
