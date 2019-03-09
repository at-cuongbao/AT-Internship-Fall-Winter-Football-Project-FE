import { MatchService } from 'src/app/shared/services/match.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { END_POINT } from './../../shared/services/api-registry';
import { ApiService } from './../../shared/services/api.service';
import { fake_data } from '../../../assets/mock-match';

const POSITION = {
  ck: 2,
  bk: 4,
  tk: 8
}

const POSITION_32 = {
  ck: 6,
  bk: 8,
  tk: 16
}

@Component({
  selector: 'app-tournament-detail',
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.scss']
})
export class TournamentDetailComponent implements OnInit {
  tournamentName: string;
  _src = "../../../assets/images/tr.png";
  bracketView = [];
  teams = [];
  id = '';
  tournaments = [];
  flag = false;

  constructor(
    private matchService: MatchService,
    private route: ActivatedRoute,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.getMatches();
    this.id = this.route.snapshot.params.id;
    let url = [END_POINT.tournamentTeams + '/' + this.id];
    this.apiService.get(url).subscribe(
      value => {
        value.sort((a, b) => {
          return (a.groupName > b.groupName) ? 1 : -1;
        })
        this.teams = value;
      }
    );

    let urls = [END_POINT.tournaments + '/' + this.id];
    this.apiService.get(urls).subscribe(
      value => {
        this.tournaments = value;
      }
    );
  }

  generateMatches(data, kind = POSITION) {
    Object.keys(kind).forEach(key => {
      for (let i = 1; i <= kind[key]; i++) {
        let team = data.find(value => {
          return (value.label === key && value.position === i);
        });
        this.bracketView.push({
          label: key,
          position: i,
          logo: team && team.logo ? team.logo : '../../../assets/images/../../../assets/images/default-image.png',
          code: team && team.code ? team.code : '?',
          score: team && team.score ? team.score : '?'
        });
      }
    });
  }

  getMatches() {
    let tournamentId = this.route.snapshot.paramMap.get('id');
    this.matchService.get(tournamentId)
      .subscribe(data => {
        console.log(data.matches)
        if (data.matches.length < 17) {
          this.generateMatches(data.matches);
        } else {
          this.flag = true;
          this.generateMatches(data.matches, POSITION_32);
        }
      }, error => {
        this.generateMatches([]);
      });
  }
}
