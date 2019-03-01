import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { END_POINT } from 'src/app/shared/services/api-registry';
  
@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.scss']
})
export class MatchDetailComponent implements OnInit {
id = '';
tournaments = [];

  match = {
    start_at: '?',
    firstTeam: {
      code: '?',
      logo: '../../../assets/images/logo-img.png',
      score: '?'
    },
    secondTeam: {
      code: '?',
      logo: '../../../assets/images/logo-img.png',
      score: '?'
    }
  };
  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) { }
  
  ngOnInit() {
    this.getMatch();
  }
  
  getMatch() {
    let id = this.route.snapshot.params.id;
    this.api.get([END_POINT.matches + '/' + id])
      .subscribe(data => {
        if (data != 404) {
          this.match = {
            start_at: data[0].match_id.start_at,
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
        }
      });

      let urls = [END_POINT.tournaments + '/' + this.id];
      this.api.get(urls).subscribe(
        value => {
          this.tournaments = value;
          console.log(this.tournaments);
        }
      );
  }
}
