import { Injectable } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) { }

  openDialog(component) {
    const dialogRef = this.dialog.open(component, {
      data: {
        animal: 'panda'
      }
    });
  }

  closeDialog() {
    // this.dialogRef.
  }
}
