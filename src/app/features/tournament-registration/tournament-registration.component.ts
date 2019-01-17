import { Component, OnInit, Inject } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { END_POINT } from './../../shared/services/api-registry';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TeamRegistrationComponent } from './../team-registration/team-registration.component';
import { Team } from 'src/app/shared/models/team';
import { TournamentService } from 'src/app/shared/services/tournament.service';

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
  teams: Team[] = [];
  imageLogo = [];

  // Long
  name = '';
  number = '';
  a = [];
  email = '';
  phone = '';
  information = '';
  isShowForm = false;
  bang = ["A", "B", "C", "D", "E", "F", "H", "G"];

  constructor(private tournament: TournamentService, public dialog: MatDialog) { }

  ngOnInit() {
    for (let i = 0; i < 16; i++) {
      this.teams.push(null);
      this.imageLogo.push(null);
    }
  }

  // open diablog ====chau
  openDialog(index) {
    const dialogRef = this.dialog.open(TeamRegistrationComponent, {

    });

    dialogRef.afterClosed().subscribe(result => {
      this.teams[index] = result.team;
      this.imageLogo[index] = result.urlLogo;

      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageLogo[index] = event.target.result;
      }

      reader.readAsDataURL(this.imageLogo[index]);

      console.log('The dialog was closed', this.teams);
    });
  }
  // ===================

  convert(number) {
    this.a = [];
    for (let i = 0; i < number.value; i++) {
      this.a.push(i);
    }
  }

  onSubmit(f: NgForm) {
    console.log(f.control.value);

    let data = {
      tournament: {
        name: f.control.value.name,
        start: f.control.value.start,
        end: f.control.value.finish,
        des: f.control.value.des
      },
      teams: this.teams
    };
    console.log(data);
    
    this.tournament.tournamentRegistration(data);

  }

}
