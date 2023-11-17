import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { AddClientRequestModelComponent } from "./add-client-request-model/add-client-request-model.component";
import { delay, take } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { ClientRequestDeleteConfirmModel } from "./client-request-delete-confirm/client-request-delete-confirm.model";
import { ClientVisitService } from "src/app/services/client-visit.service";

@Component({
  selector: "app-request",
  templateUrl: "./request.component.html",
  styleUrls: ["./request.component.scss"],
})
export class RequestComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    "id",
    "clientName",
    "countryName",
    "fromDate",
    "toDate",
    // "createdBy",
    "createdOn",
    "updatedOn",
    "edit"
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);;
  error: any;

  loadingStaus = {
     requests: 'initial'
  }

  constructor(
    public dialog: MatDialog,
    private clientVisitService: ClientVisitService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getRequests();
  }

  getRequests() {
    this.loadingStaus['requests'] = 'loading';
    this.clientVisitService.getAllClientVisits().pipe(take(1),delay(2000)).subscribe({
      next: (response) =>  {
        this.loadingStaus['requests'] = 'loaded';
        this.dataSource.data = response;
      },
      error: (error) => {
        this.loadingStaus['requests'] = 'error';
        this.toastr.error('Error in retrieving client requests! Pls try after some time', 'Error');
        this.error = error.message;
      }
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDialog(mode: string, request? : any) {
    let dialogRef = this.dialog.open(AddClientRequestModelComponent, 
      {
        width: '100%',
        data: {
          request: {...request},
          mode: mode
        }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        result['id'] ? this.updateRequest(result) : this.createRequest(result);
      }
    });
  }

  createRequest(request: any) {
    let clientRequest = {...request};
    this.clientVisitService.createClientVisit(clientRequest).pipe(take(1)).subscribe({
      next: () => {
        this.getRequests();
      },
      error: () => {
        this.toastr.error('Error in creating request, Pls try after some time', 'Error');
      }
    })
  }

  updateRequest(request: any)  {
    let clientRequest = {...request};
    let id = clientRequest['id'];
    this.clientVisitService.updateClientVisit(id, clientRequest).pipe(take(1)).subscribe({
      next: () => {
        this.getRequests();
      },
      error: () => {
        this.toastr.error('Something went wrong', 'Error');
      }
    })
  }

  deleteConfirmDialog(request? : any) {
    let dialogRef = this.dialog.open(ClientRequestDeleteConfirmModel, {
        width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.clientVisitService.deleteClientVisitsById(request['id']).subscribe({
        next: () => this.getRequests(),
        error: () => {
          this.toastr.error('Something went wrong', 'Error');
        }
      })
    });
  }
}
