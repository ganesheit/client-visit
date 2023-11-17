import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ClientData } from 'src/app/models/client-data';
import { ParticipantData } from 'src/app/models/participant-data';
import { CommonService } from 'src/app/services/common.service';
import { ParticipantService } from 'src/app/services/participant.service';
import { ClientRequestDeleteConfirmModel } from '../../request/client-request-delete-confirm/client-request-delete-confirm.model';
import { AddClientDetailsDialog } from './add-client-details/add-client-details.dialog';
import { ToastrService } from 'ngx-toastr';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'email', 'address', 'arrivalFlightDetails', 'origin', 'mobileNo', 'action'];
  dataSource: MatTableDataSource<ClientData> = new MatTableDataSource([]);;
  clientVisitId: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,
    private participantService: ParticipantService,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.clientVisitId = this.route?.snapshot?.paramMap?.get('id');
    this.getParticipants();
  }

  getParticipants() {
    this.participantService.getParticipantByClientId(this.clientVisitId).subscribe(
      (participants: any[]) => {
        this.dataSource.data = participants;
      },
      (error) => {
        this.toastr.error("Client details could not be retrieved at the moment !!", 'Error', {
          positionClass: 'toast-center'
        })
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(action, data?) {
    const dialogRef = this.dialog.open(AddClientDetailsDialog, {
      data: {
        clientVisitId: this.clientVisitId,
        action: action,
        participantData: data
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getParticipants();
        this.cdr.detectChanges();
      }
    });
  }

  viewParticipantDialog(participantData: ParticipantData) {
    this.commonService.openDetailModal(participantData);
  }

  deleteParticipant(participantId: any) {
    let dialogRef = this.dialog.open(ClientRequestDeleteConfirmModel, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.participantService.deleteParticipant(participantId).subscribe(
          (response) => {
            this.toastr.success("Client details deleted successfully", 'Success', {
              positionClass: 'toast-center'
            });
            this.getParticipants();
          },
          (error) => {
            this.toastr.error("Delete unsuccessful, Pls try lateer !!", 'Error', {
              positionClass: 'toast-center'
            });
          }
        );

      }
    });
  }


}
