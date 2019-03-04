import { Component, OnInit, ViewChild, ElementRef, Renderer, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { END_POINT } from 'src/app/shared/services/api-registry';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-dialog-edit-match',
  templateUrl: './dialog-edit-match.component.html',
  styleUrls: ['./dialog-edit-match.component.scss']
})
export class DialogEditMatchComponent implements OnInit, OnChanges {

  @Input("matchData") matches: any;
  @Output("onSubmit") sendData = new EventEmitter();
  @ViewChild("modal", { read: ElementRef }) modal: ElementRef;
  @ViewChild("elmForm", { read: NgForm }) elmForm: NgForm;
  firstTeamPrediction_ngModel;
  secondTeamPrediction_ngModel;
  firstTeamScore_ngModel;
  secondTeamScore_ngModel;
  match: any;
  isWinner = true;
  disableRadio_btn = true;
  imageWinner = '../../../assets/images/prize.png';

  constructor(
    private auth: AuthService,
    private renderer: Renderer,
    private apiService: ApiService
  ) { }

  ngOnChanges() {
    this.match = this.matches[0];
    // console.log(this.matches);
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
    this.renderer.setElementAttribute(this.modal.nativeElement, "style", "display: block");
    if (this.match.secondTeam.winners || (this.match.firstTeam.score < this.match.secondTeam.score)) {
      this.isWinner = false;
    }
    if (this.match.round !== 1) {
      this.disableRadio_btn = false;
      if (this.firstTeamScore_ngModel === this.secondTeamScore_ngModel) {
        this.disableRadio_btn = false;
      }
    }
  }

  onSubmit(form: NgForm, match) {
    const data = {
      match_id: match.id,
      user_id: this.auth.currentUser.sub,
      scorePrediction: [form.value.firstTeamPrediction, form.value.secondTeamPrediction],
      tournament_team_id: [match.firstTeam.id, match.secondTeam.id],
      winners: []
    };
    let url = [END_POINT.prediction + '/new'];
    if (this.auth.currentUser.admin) {
      url = [END_POINT.matches + '/update'];
      data.scorePrediction = [form.value.firstTeamScoreValue, form.value.secondTeamScoreValue];
      data.winners = [form.value.firstTeamWinner, form.value.secondTeamWinner];
    }
    this.apiService.post(url, data).subscribe(code => {
      if (code === 200) {
        this.match = match;
        this.closeModal(match);
      } else {
        alert("Time out to predict !");
      }
    });
  };

  closeModal(match) {
    this.sendData.emit(match);
  }

  changeFlag(isWinner) {
    this.isWinner = isWinner;
  }

  checkWinner() {
    if (this.match.round !== 1) {
      if (this.firstTeamScore_ngModel < this.secondTeamScore_ngModel) {
        this.isWinner = false;
      } else if (this.firstTeamScore_ngModel === this.secondTeamScore_ngModel) {
        this.disableRadio_btn = false;
      } else {
        this.isWinner = true;
      }
    }
  }
}
