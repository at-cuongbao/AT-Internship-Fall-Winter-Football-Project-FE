import { Component, OnInit, Input } from '@angular/core';
import { TournamentService } from 'src/app/shared/services/tournament.service';

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.scss']
})
export class TournamentListComponent implements OnInit {
  tournamentList = [];
  pageActual = 1;
  @Input() flag;

  constructor(private tournamentService: TournamentService) { }

  ngOnInit() {
    this.tournamentService.get().subscribe(tournamentList => {
      this.flag 
        ? this.tournamentList = tournamentList.slice(0, 3)
        : this.tournamentList = tournamentList;
    });
  }
}
