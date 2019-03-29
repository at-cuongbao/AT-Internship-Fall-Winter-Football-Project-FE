import { MatchService } from 'src/app/shared/services/match.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { END_POINT } from './../../shared/services/api-registry';
import { ApiService } from './../../shared/services/api.service';

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
const tablesGroup = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

@Component({
  selector: 'app-tournament-detail',
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.scss']
})
export class TournamentDetailComponent implements OnInit {
  flag = false;
  loading = true;
  topTeamFlag = 0;
  id = '';
  tournamentName = '';
  _src = "../../../assets/images/tr.png";
  bracketView = [];
  teams = [];
  _teams = [];
  tournaments = [];
  winner = {};

  constructor(
    private matchService: MatchService,
    private route: ActivatedRoute,
    private apiService: ApiService,
  ) { }

  ngOnInit() {  
    this.getMatches();
    this.getTeams();
    this.getTournament();
    this.getTopTeam();
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

  getTournament() {
    let urls = [END_POINT.tournaments + '/' + this.id];
    this.apiService.get(urls).subscribe(
      value => {
        this.tournaments = value;
      }
    );
  }

  getTeams() {
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
  }

  getTopTeam() {
    let tournamentId = this.route.snapshot.paramMap.get('id');
    let transformedData = [];

    this.matchService.getTopTeams(tournamentId)
      .subscribe(data => {
        this.loading = false;
        let _data = data ? data : this.teams;
        let dataLength = _data.length;
        let tables = tablesGroup.slice(0, dataLength / 4);
    
        transformedData.push(tables);

        for (let i = 0; i < 4; i++) {
          let rowData = []
          for (let j = i; j < dataLength; j += 4) {
            rowData.push(_data[j]);
          }
          transformedData.push(rowData);
        }
        data ? this.teams = transformedData : this._teams = transformedData;
        this.topTeamFlag = data ? dataLength / 4 : 0;
      })
  }

  getMatches() {
    let tournamentId = this.route.snapshot.paramMap.get('id');
    this.matchService.get(tournamentId)
      .subscribe(data => {
        this.winner = data.winner;
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
