import { Component, OnInit, Inject } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { END_POINT } from './../../shared/services/api-registry';
import { map } from 'rxjs/operators';
import { TransfereService } from './../../shared/services/transfere.service';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { TeamRegistrationComponent } from './../team-registration/team-registration.component';
import { Team } from 'src/app/shared/models/team';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-tournament-registration',
  templateUrl: './tournament-registration.component.html',
  styleUrls: ['./tournament-registration.component.scss']
})
export class TournamentRegistrationComponent implements OnInit {
  // chau event show component add team



  //
  teams: Team[] = [];
  name = '';
  number = '';
  a = [];
  email = '';
  phone = '';
  information = '';
  isShowForm = false;
  bang = ["A", "B", "C", "D", "E", "F", "H", "G"];

  constructor(private transfere: TransfereService, public dialog: MatDialog) { }

  ngOnInit() {

  }

  // open diablog
  openDialog() {
    const dialogRef = this.dialog.open(TeamRegistrationComponent, {
  
    });

    dialogRef.afterClosed().subscribe(result => {
      this.phone = result;
      this.teams = result;
      console.log('The dialog was closed', this.teams);
    });
  }

  convert(number) {
    this.a = [];
    for (let i = 0; i < number.value; i++) {
      this.a.push(i);
    }
  }

  submit(f: NgForm) {
    // console.log(f.value)
    // let url = [END_POINT.teams]
    // this.registerTeamService.post(url  ,f.value).pipe(
    //   map(response => {
    //     if (response) {
    //       console.log(response);
    //       return true;
    //     }
    //     return false
    //   })
    // );
  }

}
