import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/shared/services/match.service';

const POSITION = {
  ck: 2,
  bk: 4,
  tk: 8
}

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss']
})
export class BracketComponent implements OnInit {
  tournamentName: string;
  bracketView = [];
  winner = {};
  api = [];

  constructor(private matchService: MatchService) { }

  ngOnInit() {
    this.getMatches();
  }

  generateMatches() {
    Object.keys(POSITION).forEach(key => {
      for (let i = 1; i <= POSITION[key]; i++) {
        let team = this.api.find((value) => {
          return (value.label === key && value.position === i);
        });
        if (team) {
          this.bracketView.push({
            label: key,
            position: i,
            code: team ? team.code : '?',
            score: team && team.score ? team.score : '?'
          });
        } else {
          this.bracketView.push({
            label: key,
            position: i,
            code: '?',
            score: '?'
          });
        }
      }
    });
  }

  getMatches() {
    this.matchService.get("5c4fbbaa0b614f0a24019243")
      .subscribe(data => {
        data.matches.sort((n1, n2) => n1.id - n2.id);
        let i = 0;
        this.api.map(
          (team) => {
            team.code = data.matches[Math.floor(i/2)].code || 'code';
            team.score = data.matches[Math.floor(i/2)].score || '?';
            i++;
          }
        )
        this.tournamentName = data.tournamentName;
        this.generateMatches();
      });
  }

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }
}
