import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddArrangementModelComponent } from './add-arrangement-model/add-arrangement-model.component';
import { ArrangementService } from './services/arrangement.service';
import { take, tap } from 'rxjs/operators';
import { ArrangementResponse } from './models/arrangementResponse';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-arrangements',
  templateUrl: './arrangements.component.html',
  styleUrls: ['./arrangements.component.scss']
})
export class ArrangementsComponent {
  client_id: string;

  arrangements: ArrangementResponse[];

  constructor(public dialog: MatDialog, private arrangementService: ArrangementService, private route: ActivatedRoute) {
    this.client_id = this.route?.snapshot?.paramMap?.get('id');
    this.callBackend();
  }

  callBackend() {
    this.arrangementService.get(this.client_id).pipe(take(1)).pipe(tap((response) => {
      this.arrangements = response;
    })).subscribe();
  }

  openDialog() {
    let dialogRef = this.dialog.open(AddArrangementModelComponent, {
      height: '90%',
      width: '100%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

    dialogRef.componentInstance.submitClicked.subscribe(this.save.bind(this));
  }

  modify(arrangement, type) {
    arrangement.arrangementType = type;
    this.arrangementService.editArrangement(this.client_id, arrangement).subscribe(this.callBackend);
  }

  save(arrangement) {
    this.arrangementService.addArrangement(this.client_id, arrangement).subscribe(this.callBackend);
  }
}
