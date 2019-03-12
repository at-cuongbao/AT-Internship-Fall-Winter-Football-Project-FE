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

  generateMatches(data) {
    Object.keys(POSITION).forEach(key => {
      for (let i = 1; i <= POSITION[key]; i++) {
        let team = data.find(value => {
          return (value.label === key && value.position === i);
        });
        this.bracketView.push({
          label: key,
          position: i,
          logo: team && team.logo ? team.logo : '',
          code: team && team.code ? team.code : '?',
          score: team && team.score ? team.score : '?'
        });
      }
    });
  }

  getMatches() {
    let tournamentId = this.route.snapshot.paramMap.get('id') || '5c4fbbaa0b614f0a24019243';
    this.matchService.get(tournamentId)
      .subscribe(data => {
        if (tournamentId === '5c7f996b1329561d847789c8') {
          let finals = [];
          let match_round = {
            code: null,
            label: "ck",
            logo: "../../../assets/images/default-image.png",
            position: 1,
            score: null
          }
          // fake quarters
          let index = 0;
          fake_data.quarters.map(match => {
            match_round = {
              code: match.firstTeam.code,
              label: "tk",
              position: ++index,
              logo: match.firstTeam.logo,
              score: match.firstTeam.score
            }
            finals.push(match_round);
            match_round = {
              code: match.secondTeam.code,
              label: "tk",
              position: ++index,
              logo: match.secondTeam.logo,
              score: match.secondTeam.score
            }
            finals.push(match_round);
          })
          // fake semis
          index = 0;
          fake_data.semis.map(match => {
            match_round = {
              code: match.firstTeam.code,
              label: "bk",
              position: ++index,
              logo: match.firstTeam.logo,
              score: match.firstTeam.score
            }
            finals.push(match_round);
            match_round = {
              code: match.secondTeam.code,
              label: "bk",
              position: ++index,
              logo: match.secondTeam.logo,
              score: match.secondTeam.score
            }
            finals.push(match_round);
          })
          // fake finals
          fake_data.finals.map(match => {
            match_round = {
              code: match.firstTeam.code,
              label: "ck",
              position: 1,
              logo: match.firstTeam.logo,
              score: match.firstTeam.score
            }
            finals.push(match_round);
            match_round = {
              code: match.secondTeam.code,
              label: "ck",
              position: 2,
              logo: match.secondTeam.logo,
              score: match.secondTeam.score
            }
            finals.push(match_round);
          })
          this.generateMatches(finals);
        } else {
          this.generateMatches(data.matches);
        }

      }, error => {
        this.generateMatches([]);
      });
  }
}
