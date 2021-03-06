import { Component, OnInit, Input } from '@angular/core';
import { TournamentService } from 'src/app/shared/services/tournament.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.scss']
})
export class TournamentListComponent implements OnInit {
  tournamentList = [];
  pageActual = 1;
  @Input() flag;
  showLoadingIndicator = true;

  constructor(
    private tournamentService: TournamentService,
    private auth: AuthService,
    private spinner: NgxSpinnerService
  ) {}
  
  ngOnInit() {
    this.getTournaments();
  }

  getTournaments(): void {
    this.tournamentService.get().subscribe(tournamentList => {
      this.flag 
      ? this.tournamentList = tournamentList.slice(0, 3)
      : this.tournamentList = tournamentList;

      this.showLoadingIndicator = false;
    });
  }
}
