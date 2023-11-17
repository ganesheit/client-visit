import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AgendaDetail } from '../models/agenda-detail';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  apiUrl = environment.agendaUrl;

  constructor(private http: HttpClient) {}

  getAllAgenda(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getAgendaById(agendaId: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${agendaId}`);
  }

  getAgendaByClientVisitId(clientVisitId: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/clientVisit/${clientVisitId}`).pipe(shareReplay());
  }

  createAgenda(agendaDetails: AgendaDetail, clientVisitId: string): Observable<any> {
    console.log(agendaDetails);
    return this.http.post<any>(`${this.apiUrl}?clientVisitId=${clientVisitId}`, agendaDetails);
  }

  deleteAgenda(agendaId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${agendaId}`);
  }

  updateAgenda(agendaDetails: AgendaDetail, agendaId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}?clientVisitId=${agendaId}`, agendaDetails);
  }
}
