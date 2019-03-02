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

@Component({
  selector: 'app-tournament-detail',
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.scss']
})
export class TournamentDetailComponent implements OnInit {
  tournamentName: string;
  _src = "../../../assets/images/tr.png";
  bracketView = [];

  constructor(
    private matchService: MatchService,
    private route: ActivatedRoute,
    private apiService: ApiService,
  ) { }
  teams = [];
  id = '';
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
        this.generateMatches(data.matches);
      }, error => {
        this.generateMatches([]);
      });
  }
  
}
