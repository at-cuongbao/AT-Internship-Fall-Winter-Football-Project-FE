import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { END_POINT } from 'src/app/shared/services/api-registry';
import { NgxSpinnerService } from 'ngx-spinner';
import { Match } from 'src/app/shared/models/match';

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.scss'],
})
export class MatchDetailComponent implements OnInit {
  tournament = '';
  time: number | string;
  users = [];
  match: Match;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private spinner: NgxSpinnerService,
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
          this.match = new Match(
            new Date(data[0].match_id.start_at).toLocaleString(),
            {
              code: data[0].tournament_team_id.team_id.code,
              logo: data[0].tournament_team_id.team_id.logo,
              score: data[0].score || '?',
            },
            {
              code: data[1].tournament_team_id.team_id.code,
              logo: data[1].tournament_team_id.team_id.logo,
              score: data[1].score || '?',
            }
          );
          this.spinner.hide();
          this.time = this.match.start_at;
        }
      });
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
    // Do something
  }
}
