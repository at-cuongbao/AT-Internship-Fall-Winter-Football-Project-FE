import { MatchService } from 'src/app/shared/services/match.service';
import { ActivatedRoute } from '@angular/router';
import { Output, EventEmitter, OnInit, Component } from '@angular/core';

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
  src = "../../../assets/images/tr.png";
  bracketView = [];

  constructor(
    private matchService: MatchService,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    this.getMatches();
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
          logo: team && team.logo ? team.logo : '',
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
