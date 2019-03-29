import { Component, OnInit, Input } from '@angular/core';
import { TournamentService } from 'src/app/shared/services/tournament.service';

@Component({
  selector: 'app-football-results',
  templateUrl: './football-results.component.html',
  styleUrls: ['./football-results.component.scss']
})
export class FootballResultsComponent implements OnInit {
  tournamentList = [];
  length = 0;
  @Input() flag;
  showLoadingIndicator = true;

  constructor(
    private tournamentService: TournamentService,
  ) { }

  ngOnInit() {
    this.getTournaments();
  }

  getTournaments(): void {
    this.tournamentService.get().subscribe(tournamentList => {
      console.log(tournamentList);
      
      this.flag 
      ? this.tournamentList = tournamentList.slice(0, 3)
      : this.tournamentList = tournamentList;
      this.showLoadingIndicator = false;
      this.length = this.tournamentList.length
    });
  }
}
