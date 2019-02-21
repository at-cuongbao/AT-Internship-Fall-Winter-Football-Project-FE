import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TournamentService } from '../../services/tournament.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isClick = false;
  tournaments = [];

  constructor(
    private auth: AuthService,
    private tournamentService: TournamentService,
    private router: Router
  ) { }

  ngOnInit() {
    this.tournamentService.get().subscribe(data => {
      data.map(tournament => {
        this.tournaments.push({ id: tournament._id, name: tournament.name });
      });
    });   
  }

  createResponsive() {
    this.isClick = !this.isClick;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
