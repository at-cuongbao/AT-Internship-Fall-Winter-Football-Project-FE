import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { END_POINT } from 'src/app/shared/services/api-registry';
import { ApiService } from 'src/app/shared/services/api.service';
import swal from 'sweetalert';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dialog-edit-match',
  templateUrl: './dialog-edit-match.component.html',
  styleUrls: ['./dialog-edit-match.component.scss']
})
export class DialogEditMatchComponent implements OnInit, OnChanges {
  @Input("matchData") matches: any;
  @Output("onSubmit") sendData = new EventEmitter();
  firstTeamScore: number;
  secondTeamScore: number;
  start_at_ngModel: Date;
  match: any;
  isWinner = true;
  imageWinner = '../../../assets/images/prize.png';
  errorMessage: String;
  isAdmin = false;
  disabledRadio_btn = true;
  disabledSubmit_btn = false;

  constructor(
    private auth: AuthService,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnChanges() {
    this.match = this.matches[0];
    this.start_at_ngModel = this.match.start_at || 'Unset';
    if (this.auth.currentUser) {
      if (this.auth.currentUser.admin) {
        this.firstTeamScore = this.match.firstTeam.score;
        this.secondTeamScore = this.match.secondTeam.score;
      } else {
        this.firstTeamScore = this.match.prediction.firstTeam_score_prediction;
        this.secondTeamScore = this.match.prediction.secondTeam_score_prediction;
      }
    }
  }

  ngOnInit() {
    // Check role is admin or user
    if (this.auth.currentUser && this.auth.currentUser.admin) {
      this.isAdmin = true;
    }

    if (this.match.secondTeam.winners || (this.match.firstTeam.score < this.match.secondTeam.score)) {
      this.isWinner = false;
    }
    if (this.match.round !== 1) {
      if (this.firstTeamScore === this.secondTeamScore) {
        this.disabledRadio_btn = false;
      }
    }
  }

  closeModal(match) {
    this.sendData.emit(match);
  }

  changeFlag(isWinner) {
    this.isWinner = isWinner;
  }

  checkWinner() {
    if (
      Number.isInteger(+this.firstTeamScore) && Number.isInteger(+this.secondTeamScore)
      && this.firstTeamScore >= 0 && this.firstTeamScore < 100
      && this.secondTeamScore >= 0 && this.secondTeamScore < 100
    ) {
      this.disabledSubmit_btn = false;
    } else {
      this.disabledSubmit_btn = true;
      return;
    }
    if (this.isAdmin) {
      this.disabledRadio_btn = true;
      if (this.match.round !== 1) {
        if (this.firstTeamScore < this.secondTeamScore) {
          this.isWinner = false;
        } else if (this.firstTeamScore > this.secondTeamScore) {
          this.isWinner = true;
        } else {
          this.disabledRadio_btn = false;
        }
      }
    }
  }

  checkTime(input: NgModel) {
    let chosenTime = input.control.value;
    if (chosenTime && new Date(chosenTime).getTime() < Date.now()) {
      this.errorMessage = 'Insert day must be greater than now !';
    } else {
      this.errorMessage = '';
    }
  }

  onSubmit(form: NgForm, match) {
    if (this.disabledSubmit_btn) {
      return;
    }
    const tournamentId = this.route.snapshot.paramMap.get('id');
    const data = {
      match_id: match.id,
      user_id: this.auth.currentUser.sub,
      tournament_team_id: [match.firstTeam.firstTournamentTeamId, match.secondTeam.secondTournamentTeamId],
      start_at: form.value.start_at,
      scorePrediction: [form.value.firstTeamScoreValue, form.value.secondTeamScoreValue],
      winners: [],
      tournament_id: '',
      groupName: Math.ceil(match.round)
    };

    let titleBtn = 'predicted';
    let url = [END_POINT.prediction + '/new'];
    if (this.isAdmin) {
      titleBtn = 'updated';
      url = [END_POINT.matches + '/update'];
      data.winners = [this.isWinner, !this.isWinner];
      data.tournament_id = tournamentId;
    }
    this.apiService.post(url, data).subscribe(code => {
      if (code === 200) {
        this.match = match;
        swal({
          buttons: [false],
          text: `You have ${titleBtn} successfully !`,
          icon: "success",
          timer: 2000,
        });
      } else {
        swal({
          buttons: [false],
          text: 'Time out to predict !',
          icon: "error",
          timer: 2000,
        });
      }
    }, err => {
      console.error(err);
    }, () => {
      this.closeModal(match);
    });
  };
}
