import { Component, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AgendaDetail } from 'src/app/models/agenda-detail';
import { AgendaService } from 'src/app/services/agenda.service';

@Component({
  selector: 'app-add-agenda',
  templateUrl: './add-agenda.dialog.html',
  styleUrls: ['./add-agenda.dialog.scss']
})
export class AddAgendaDialog {
  agendaForm: FormGroup;
  clientVisitId: string;
  raboParticipants = ['PK', 'Laura', 'Visagan', 'Amerik'];
  cognizantParticipants = ['PK', 'Laura', 'Visagan'];
  dressCode = ['Business Casuals', 'Triditional', 'Casuals'];
  presenters =  ['PK', 'Laura', 'Visagan', 'Amerik'];
  duration: string;
  onSave = new EventEmitter();
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: {clientVisitId: string, action: string, agenda: any}, private agendaService: AgendaService, private formBuilder: FormBuilder,
  public dialogRef: MatDialogRef<AddAgendaDialog>,
  private toaster: ToastrService) {
    this.agendaForm = this.formBuilder.group({
      agendaTitle: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      presenters: [''],
      raboparticipants: [''],
      cognizantparticipants: [''],
      description: [''],
      dresscode: [''],
      venue: [''],
      comments: [''],
      clientProposedTopics: ['']
    });
    this.clientVisitId = this.data.clientVisitId;
    if (this.data.action === 'edit') {
      this.updateAgendaForm();
    }
  }

  addAgendaForm() {
    
  }

  updateAgendaForm() {
    this.agendaForm.patchValue({
      agendaTitle: this.data.agenda.agendaTitle,
      startTime: this.data.agenda.fromDate,
      endTime: this.data.agenda.toDate,
      presenters: this.splitString(this.data.agenda.presenters),
      raboparticipants: this.splitString(this.data.agenda.rabobankParticipants),
      cognizantparticipants: this.splitString(this.data.agenda.cognizantParticipant),
      description: this.data.agenda.agendaDescription,
      dresscode: this.splitString(this.data.agenda.dressCode),
      venue: this.data.agenda.venue,
      comments: this.data.agenda.comments,
      clientProposedTopics: this.data.agenda.clientProposedTopics
    });
    this.calculateDuration();

  }

  splitString(value: string) {
    if (value.includes(',')) {
      return value.split(',');
    }
    return [value];
  }

  ngOnInit(): void {
    console.log(this.data.action)
  }

  onAddAgendaClick() {
    let agendatDetails = {
      fromDate: this.changeISTDateTime(this.agendaForm.get('startTime').value),
      toDate: this.changeISTDateTime(this.agendaForm.get('endTime').value),
      duration: this.duration,
      agendaTitle: this.agendaForm.get('agendaTitle').value,
      agendaDescription: this.agendaForm.get('description').value,
      rabobankParticipants: (this.agendaForm.get('raboparticipants').value).join(','),
      cognizantParticipant: (this.agendaForm.get('cognizantparticipants').value).join(','),
      clientProposedTopics: this.agendaForm.get('clientProposedTopics').value,
      dressCode: (this.agendaForm.get('dresscode').value).join(','),
      venue: this.agendaForm.get('venue').value,
      comments: this.agendaForm.get('comments').value,
      presenters: (this.agendaForm.get('presenters').value).join(',')
    } as AgendaDetail;
    if (this.data.action === 'add') {
       this.agendaService.createAgenda(agendatDetails, this.clientVisitId).subscribe(
      (response) => {
        
        this.toaster.success('Agenda created successfully', 'Success');
        // this.dialogRef.close({event: 'add'});
        this.onSave.emit({event: 'add'});
      },
      (error) => {
        console.log('Error', error);
      }
    );
    } else {
      agendatDetails.id = this.data.agenda.id;
      this.agendaService.updateAgenda(agendatDetails, this.data.agenda.id).subscribe(
        (response) => {
         this.toaster.success('Agenda updated successfully', 'Success');
        this.onSave.emit({event: 'edit'});

        },
        (error) => {
          console.log('Error', error);
        }
      );
    }
  }

  changeISTDateTime(date: any) {
    const localDate = new Date(date);
    const hours = localDate.getHours();
    const minutes = localDate.getMinutes();
    const newDate = new Date(localDate.setHours(hours + 5, minutes + 30));
    return newDate;
  }

  calculateDuration() {
    const startDate = this.agendaForm.get('startTime').value;
    const endDate = this.agendaForm.get('endTime').value;
    this.duration = '';
    
    if (startDate && endDate) {
      const startTime = new Date(startDate).getTime();
      const endTime = new Date(endDate).getTime();
      const durationInMilliseconds = endTime - startTime;
      const durationInMinutes = durationInMilliseconds / (1000 * 60);
      this.duration = durationInMinutes.toString();
    }
  }


  convertDateToTime(date: any) {
    const localDate = new Date(date);
    let hours = localDate.getHours();
    const minutes = localDate.getMinutes();
    hours = hours % 12;
    // hours = hours ? hours : 12; // the hour '0' should be '12'
    const hours1 = hours < 10 ? '0' + hours : hours;
    const minutes1 = minutes < 10 ? '0' + minutes : minutes;
    const strTime = hours1 + ':' + minutes1;
    return strTime;
  }
}
