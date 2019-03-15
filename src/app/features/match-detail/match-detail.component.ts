import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { END_POINT } from 'src/app/shared/services/api-registry';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.scss']
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
  
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private spinner: NgxSpinnerService
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
}
