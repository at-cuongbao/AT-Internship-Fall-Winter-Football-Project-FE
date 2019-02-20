import { Component, OnInit } from '@angular/core';
import { TournamentService } from 'src/app/shared/services/tournament.service';

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.scss']
})
export class TournamentListComponent implements OnInit {
  imageSource = '../../../assets/images/head-bg.jpg';
  tournamentList = [];
  pageActual = 1;
  
  constructor(private tournamentService: TournamentService) { }

  ngOnInit() {
    this.tournamentService.get().subscribe(tournamentList => {
      this.tournamentList = tournamentList;
    });
  }
}
