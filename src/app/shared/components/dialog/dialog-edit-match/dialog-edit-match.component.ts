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
  firstTeamPrediction_ngModel;
  secondTeamPrediction_ngModel;
  firstTeamScore_ngModel;
  secondTeamScore_ngModel;
  start_at_ngModel: Date;
  match: any;
  isWinner = true;
  disableRadio_btn = true;
  imageWinner = '../../../assets/images/prize.png';
  errorMessage: String;

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
        this.firstTeamScore_ngModel = this.match.firstTeam.score;
        this.secondTeamScore_ngModel = this.match.secondTeam.score;
      } else {
        this.firstTeamPrediction_ngModel = this.match.prediction.firstTeam_score_prediction;
        this.secondTeamPrediction_ngModel = this.match.prediction.secondTeam_score_prediction;
      }
    }
  }

  ngOnInit() {
    if (this.match.secondTeam.winners || (this.match.firstTeam.score < this.match.secondTeam.score)) {
      this.isWinner = false;
    }

    if (this.match.round !== 1) {
      if (this.firstTeamScore_ngModel === this.secondTeamScore_ngModel) {
        this.disableRadio_btn = false;
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
    if (this.firstTeamScore_ngModel < 0) this.firstTeamScore_ngModel = 0;
    if (this.secondTeamScore_ngModel < 0) this.secondTeamScore_ngModel = 0;
    
    if ((this.firstTeamScore_ngModel !== parseInt(this.firstTeamScore_ngModel, 10))) {
      this.firstTeamScore_ngModel = Math.floor(this.firstTeamScore_ngModel);
    }
    if (this.secondTeamScore_ngModel !== parseInt(this.secondTeamScore_ngModel, 10)) {
      this.secondTeamScore_ngModel = Math.floor(this.secondTeamScore_ngModel);
    }

    this.disableRadio_btn = true;
    if (this.match.round !== 1) {
      if (this.firstTeamScore_ngModel < this.secondTeamScore_ngModel) {
        this.isWinner = false;
      } else if (this.firstTeamScore_ngModel > this.secondTeamScore_ngModel) {
        this.isWinner = true;
      } else {
        this.disableRadio_btn = false;
      }
    }
  }

  checkTime(input: NgModel) {
    let chosenTime = input.control.value;
    if (chosenTime && new Date(chosenTime).getTime() < Date.now()) {
      this.errorMessage = "Insert day must be greater than now !";
    } else {
      this.errorMessage = "";
    }
  }

  onSubmit(form: NgForm, match) {
    let tournamentId = this.route.snapshot.paramMap.get('id');
    const data = {
      match_id: match.id,
      user_id: this.auth.currentUser.sub,
      tournament_team_id: [match.firstTeam.firstTournamentTeamId, match.secondTeam.secondTournamentTeamId],
      start_at: form.value.start_at,
      scorePrediction: [form.value.firstTeamPrediction, form.value.secondTeamPrediction],
      winners: [],
      tournament_id: ''
    };
    
    let titleBtn = 'predicted';
    let url = [END_POINT.prediction + '/new'];
    if (this.auth.currentUser.admin) {
      titleBtn = 'updated';
      url = [END_POINT.matches + '/update'];
      data.scorePrediction = [form.value.firstTeamScoreValue, form.value.secondTeamScoreValue];
      data.winners = [this.isWinner, !this.isWinner];
      data.tournament_id = tournamentId;
    }
    this.apiService.post(url, data).subscribe(code => {
      if (code === 200) {
        this.match = match;
        this.closeModal(match);
      } else {
        this.closeModal(match);
        swal({
          // buttons: false,
          text: 'Time out to predict !',
          icon: "error",
          timer: 2000,
        });
      }
      swal({
        // buttons: false,
        text: `You have ${titleBtn} successfully !`,
        icon: "success",
        timer: 2000,
      });
    });
  };
}
