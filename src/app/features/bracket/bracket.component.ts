import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/shared/services/match.service';

const POSITION = {
  ck: {
    label: 'ck',
    length: 2
  },
  bk: {
    label: 'bk',
    length: 4
  },
  tk: {
    label: 'tk',
    length: 8
  },
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
  api = [
    {
      label: 'ck',
      position: 1,
      code: 'DVC',
      score: '1'
    },
    {
      label: 'ck',
      position: 2,
      code: 'LIV',
      score: 2
    },
    {
      label: 'bk',
      position: 1,
      code: 'CHE',
      score: 2
    },
    {
      label: 'bk',
      position: 2,
      code: 'MU',
      score: 2
    },
    {
      label: 'bk',
      position: 3,
      code: 'LIV',
      score: 2
    },
    {
      label: 'bk',
      position: 4,
      code: 'REAL',
      score: 2
    },
    {
      label: 'tk',
      position: 1,
      code: 'CHE',
      score: 5
    },
    {
      label: 'tk',
      position: 2,
      code: 'VN',
      score: 5
    },
    {
      label: 'tk',
      position: 3,
      code: 'MU',
      score: 6
    },
    {
      label: 'tk',
      position: 4,
      code: 'LAO',
      score: 5
    },
    {
      label: 'tk',
      position: 5,
      code: 'LiV',
      score: 5
    },
    {
      label: 'tk',
      position: 6,
      code: 'ARS',
      score: 8
    },
    {
      label: 'tk',
      position: 7,
      code: 'BARCA',
      score: 5
    },
    {
      label: 'tk',
      position: 8,
      code: 'REAL',
      score: 5
    },

  ];

  constructor(private matchService: MatchService) { }

  ngOnInit() {
    this.getMatches();
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
        } else {
          this.bracketView.push({
            label: POSITION[key].label,
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
        data.matches.sort((n1,n2) => n1.id - n2.id);
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
