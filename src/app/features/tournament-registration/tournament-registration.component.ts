import { Component, OnInit, Inject } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { END_POINT } from './../../shared/services/api-registry';
import { map } from 'rxjs/operators';
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
  teams: Team[] = [];
  imageLogo = [];
  name = '';
  number = '';
  a = [];
  email = '';
  phone = '';
  information = '';
  isShowForm = false;
  bang = ["A", "B", "C", "D", "E", "F", "H", "G"];

  constructor(private tournament: TournamentService) { }

  ngOnInit() {
    for (let i = 0; i < 16; i++) {
      this.teams.push(null);
      this.imageLogo.push(null);
    }
  }

  convert(number) {
    this.a = [];
    for (let i = 0; i < number.value; i++) {
      this.a.push(i);
    }
  }

  onSubmit(f: NgForm) {
    let data = {
      tournament: {
        name: f.control.value.name,
        start: f.control.value.start,
        end: f.control.value.finish,
        des: f.control.value.des
      },
      teams: this.teams
    };
    this.tournament.tournamentRegistration(data);
  }
}
