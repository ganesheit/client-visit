import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ViewDetailModalComponent } from '../components/shared/view-detail-modal/view-detail-modal.component';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  getLocations() : Observable<any> {
    return this.http.get<any>('../../assets/location-data/countries+states+cities.json');
  }

  openDetailModal(data: any): void {
    this.dialog.open(ViewDetailModalComponent, {
      data: data,
      width: '50vw',
      maxHeight: '80vh'
    });
  }

}
