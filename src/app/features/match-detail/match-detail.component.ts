import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { END_POINT } from 'src/app/shared/services/api-registry';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.scss'],
  providers: [DatePipe]
})
export class MatchDetailComponent implements OnInit {
  id = '';
  tournament = '';
  match = {
    start_at: null,
    firstTeam: {
      code: 'COD',
      logo: '../../../assets/images/logo-img.png',
      score: 0
    },
    secondTeam: {
      code: 'COD',
      logo: '../../../assets/images/logo-img.png',
      score: 0
    }
  };
  users = [];
  time;
  messageTimer = '';

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.getMatch();
    this.getTopUser();
  }

  getMatch() {
    let id = this.route.snapshot.params.id;
    this.api.get([END_POINT.matches + '/' + id])
      .subscribe(data => {
        if (data != 404) {
          this.tournament = data[0];
          this.match = {
            start_at: new Date(data[0].match_id.start_at).toLocaleString(),
            firstTeam: {
              code: data[0].tournament_team_id.team_id.code,
              logo: data[0].tournament_team_id.team_id.logo,
              score: data[0].score || '?'
            },
            secondTeam: {
              code: data[1].tournament_team_id.team_id.code,
              logo: data[1].tournament_team_id.team_id.logo,
              score: data[1].score || '?'
            }
          }
          this.spinner.hide();
        }
        this.countDown();

      });
  }

  countDown() {
    const TwoHour = 1000 * 3600 * 2;
    const now = Date.now();
    this.time = new Date(this.match.start_at).getTime();
    if (now > this.time + TwoHour) {
      this.time = 0;
      this.messageTimer = this.match.start_at;
    } else if (now > this.time) {
      this.time = 0;
      this.messageTimer = 'Trận đấu đang xảy ra!';
    }
    if (this.time) {
      this.time = this.datePipe.transform(
        this.match.start_at, 'y-M-dd HH:mm:ss'
      );
    }
  }

  getTopUser() {
    let id = this.route.snapshot.params.id;
    this.api.get([END_POINT.prediction + '/top/' + id])
      .subscribe(data => {
        if (data) {
          this.users = data;
        }
      })
  }

  onFinishedCountDown() {
    this.messageTimer = 'Trận đấu đang xảy ra!!!';
  }
}
