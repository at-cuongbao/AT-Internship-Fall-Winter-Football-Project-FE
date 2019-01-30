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
  api = [
    {
      label: 'tk',
      position: 1,
      code: 'CHE',
      score: null
    }
  ];

  constructor(private matchService: MatchService) { }

  ngOnInit() {
    this.getMatches();
    this.generateMatches();
  }

  generateMatches() {
    Object.keys(POSITION).forEach(key => {
      for (let i = 1; i <= POSITION[key].length; i++) {
        let team = this.api.find((value) => {
          return (value.label === POSITION[key].label && value.position === i);
        });
        if (team) {
          this.bracketView.push({
            label: POSITION[key].label,
            position: i,
            code: team ? team.code : '?',
            score: team && team.score ? team.score : '?'
          });
        }
        this.bracketView.push({
          label: POSITION[key].label,
          position: i,
          code: '?',
          score: '?'
        });
      }
    });
  }

  getMatches() {
    this.matchService.get("5c4fbbaa0b614f0a24019243")
      .subscribe(data => {
        this.tournamentName = data.tournamentName
      });
  }

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }
}
