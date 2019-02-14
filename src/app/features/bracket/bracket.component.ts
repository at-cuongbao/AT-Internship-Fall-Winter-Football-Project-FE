import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/shared/services/match.service';
import { ActivatedRoute } from '@angular/router';

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

  constructor(
    private matchService: MatchService,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    this.generateMatches();
    this.getMatches();
  }

  generateMatches() {
    Object.keys(POSITION).forEach(key => {
      for (let i = 1; i <= POSITION[key]; i++) {
        let team = this.bracketView.find((value) => {
          return (value.label === key && value.position === i);
        });
        this.bracketView.push({
          label: key,
          position: i,
          code: '?',
          score: '?'
        });
      }
    });
  }

  getMatches() {
    let tournamentId = this.route.snapshot.paramMap.get('id') || null;
    this.matchService.get(tournamentId)
      .subscribe(data => {
        data.matches.sort((n1, n2) => n1.id - n2.id);
        let i = 0;
        this.bracketView.map(
          (team) => {
            team.code = data.matches[Math.floor(i / 2)].code || 'code';
            team.score = data.matches[Math.floor(i / 2)].score || '?';
            i++;
          }
        )
        this.tournamentName = data.tournamentName;
      });
  }
}
