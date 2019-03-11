import { Component, DoCheck } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Team } from 'src/app/shared/models/team';
import { ApiService } from 'src/app/shared/services/api.service';
import { END_POINT } from 'src/app/shared/services/api-registry';
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-tournament-registration',
  templateUrl: './tournament-registration.component.html',
  styleUrls: ['./tournament-registration.component.scss']
})
export class TournamentRegistrationComponent implements DoCheck {
  isOpenModal: boolean;
  index: number;
  imageSource: string;
  imageUrl: string;
  team: Object;
  teams: Team[];
  isSubmited = false;
  groups: Array<number>;
  tables = ["A", "B", "C", "D", "E", "F", "G", "H"];
  errorMessage = '';

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    this.isOpenModal = false;
    this.imageSource = '../../../assets/images/anhbongda.jpg';
    this.imageUrl = '../../../assets/images/default-image.png';
    this.teams = [];
    this.groups = [];
  }

  ngDoCheck() {
    this.checkTeam();
  }

  initTeam(numberGroup) {
    let team: Team;
    let teams = numberGroup * 4;
    this.tables.map(tables => {
      for (let i = 0; i < teams; i++) {
        team = new Team();
        team.name = `Team ${i + 1}`;
        team.code = `C${i + 1}`;
        team.cover = this.imageUrl;
        team.logo = this.imageUrl;
        this.teams[i] = team;
      }
    });
  }

  checkTeam() {
    this.isSubmited = true;
    this.teams.forEach(team => {
      if (!(team.name && team.code)) return this.isSubmited = false;
    });
  }

  convert(number) {
    this.groups = [];
    for (let i = 0; i < number; i++) {
      this.groups.push(i);
    }
    this.initTeam(number);
  }

  onSubmit(f: NgForm) {
    let data = {
      tournament: {
        name: f.control.value.tournamentName,
        start_at: f.control.value.start,
        group_number: this.groups.length,
        desc: f.control.value.infor
      },
      teams: this.teams
    };
    if (this.isSubmited && !f.invalid) {
      swal({
        // buttons: false,
        text: 'You have register successfully !',
        icon: "success",
        timer: 2000,
      });
      this.apiService.post([END_POINT.tournaments], data).subscribe(tournamentId => {
        this.router.navigate(['schedules', tournamentId]);
      });
    }
  }

  onModalSubmit(team) {
    if (team) this.teams[this.index] = team;
    this.isOpenModal = false;
  }

  openModal(index) {
    this.index = index;
    if (this.teams[index]) {
      this.team = Object.assign({}, this.teams[index]);
    }
    this.isOpenModal = true;
  }

  checkTime(input: NgModel) {
    let chosenTime = input.control.value;
    if (chosenTime && new Date(chosenTime).getTime() < Date.now()) {
      this.errorMessage = 'Insert day must be greater than now !';
    } else {
      this.errorMessage = '';
    }
  }
}
