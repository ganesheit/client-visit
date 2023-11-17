import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'client-request-delete-confirm',
  templateUrl: './client-request-delete-confirm.model.html',
  styleUrls: ['./client-request-delete-confirm.model.scss']
})
export class ClientRequestDeleteConfirmModel {
  message: string = "Are you sure want to delete?"
  confirmButtonText = "Yes"
  cancelButtonText = "Cancel"
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ClientRequestDeleteConfirmModel>) {
      if(data){
    this.message = data.message || this.message;
    if (data.buttonText) {
      this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
      this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
    }
      }
  }

  onConfirmClick(){
    this.dialogRef.close(true);
  }
}
