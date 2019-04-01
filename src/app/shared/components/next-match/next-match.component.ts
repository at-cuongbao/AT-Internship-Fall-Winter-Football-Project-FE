import { Component, Input, EventEmitter, Output, OnChanges, AfterContentInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { END_POINT } from 'src/app/shared/services/api-registry';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-next-match',
  templateUrl: './next-match.component.html',
  styleUrls: ['./next-match.component.scss'],
})
export class NextMatchComponent implements OnChanges {
  @Input() match: any;
  @Output() updateSchedule = new EventEmitter();
  isOpen: boolean;
  firstTeamPrediction: number;
  secondTeamPrediction: number;
  time: number | string;

  constructor(
    private auth: AuthService,
    private router: Router,
    private apiService: ApiService
  ) {
    this.isOpen = false;
  }

  ngOnChanges() {
    this.isOpen = false;
    if (this.match && this.match.start_at) {
      this.time = this.match.start_at;
    }
  }

  openMatch(match) {
    if (match.id) {
      this.router.navigate([END_POINT.match_detail + '/' + match.id]);
    } else {
      alert("Can not find match id!");
    }
  }

  open() {
    this.firstTeamPrediction = this.match.prediction.firstTeam_score_prediction;
    this.secondTeamPrediction = this.match.prediction.secondTeam_score_prediction;
    if (!this.auth.isLoggedIn()) {
      return this.router.navigate(['/login'], {
        queryParams: {
          returnUrl: this.router.url
        }
      })
    }
    this.isOpen = !this.isOpen;
  }

  onSubmit(form: NgForm) {
    const data = {
      match_id: this.match.id,
      user_id: this.auth.currentUser.sub,
      tournament_team_id: [this.match.firstTeam.firstTeamId, this.match.secondTeam.secondTeamId],
      scorePrediction: [this.firstTeamPrediction, this.secondTeamPrediction],
      winners: []
    };

    let url = [END_POINT.prediction + '/new'];

    this.apiService.post(url, data).subscribe(code => {
      if (code === 200) {
        swal({
          buttons: [false],
          text: 'Predict Success !',
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
      this.isOpen = !this.isOpen;
      this.updateSchedule.emit();
    });
  };
}
