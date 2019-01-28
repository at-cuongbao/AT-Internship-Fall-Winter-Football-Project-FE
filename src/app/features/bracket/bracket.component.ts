import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/shared/services/match.service';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss']
})
export class BracketComponent implements OnInit {
  tournamentName: string;
  matches = [];
  winner = {};

  constructor(private matchService: MatchService) { }

  ngOnInit() {
    this.getMatches();
  }

  getMatches() {
    this.matchService.get("5c4050326559ab1da4fb58de")
      .subscribe(data => {
        this.matches = data.matches;
        this.tournamentName = data.tournamentName
        this.winner = data.winner;
      });
  }
}
