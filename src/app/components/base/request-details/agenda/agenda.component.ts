import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AddAgendaDialog } from './add-agenda/add-agenda.dialog';
import { AgendaService } from 'src/app/services/agenda.service';
import { Observable, map } from 'rxjs';
import { ClientRequestDeleteConfirmModel } from '../../request/client-request-delete-confirm/client-request-delete-confirm.model';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent {
  selected: Date | null = new Date();

  selectedIndex: number = 14
  clientVisitId: any;
  agendaList: Observable<any>;

  constructor(public dialog: MatDialog,
    private agendaService: AgendaService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.clientVisitId = this.route?.snapshot?.paramMap?.get('id');
    this.getAgendaList();
  }

  getAgendaList() {
    this.agendaList = this.agendaService.getAgendaByClientVisitId(this.clientVisitId);
  }

  getLocalTime(date: any) {
    const localDate = new Date(date);
    let hours = localDate.getHours();
    const minutes = localDate.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    // hours = hours ? hours : 12; // the hour '0' should be '12'
    const hours1 = hours < 10 ? '0' + hours : hours;
    const minutes1 = minutes < 10 ? '0' + minutes : minutes;
    const strTime = hours1 + ':' + minutes1 + ' ' + ampm;
    return strTime;
  }

  durationInHoursandMinutes(start: any, end: any) {
    const date1 = new Date(start);
    const date2 = new Date(end);
    const diff = Math.abs(date1.getTime() - date2.getTime());
    const hours = Math.floor((diff / 1000) / 3600);
    const minutes = Math.floor(((diff / 1000) / 60) % 60);
    return hours + 'h ' + minutes + 'm';
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddAgendaDialog, {
      data: {
        clientVisitId: this.clientVisitId,
        action: 'add'
      }
    });

    dialogRef.componentInstance.onSave.subscribe((result: any) => {
      if (result.event === 'add' || result.event === 'edit') {
        this.getAgendaList();
      }
    });
  }

  editAgenda(agenda: any) {
    const dialogRef = this.dialog.open(AddAgendaDialog, {
      data: {
        agenda: agenda,
        action: 'edit'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAgendaList();
      }
    });
  }

  deleteAgenda(agendaId: any) {
    console.log('Delete agenda', agendaId);
    let dialogRef = this.dialog.open(ClientRequestDeleteConfirmModel, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.agendaService.deleteAgenda(agendaId).subscribe(
          (response) => {
            this.getAgendaList();
          },
          (error) => {
            console.log('Error', error);
          }
        );
  
      }
    });
  }
}
