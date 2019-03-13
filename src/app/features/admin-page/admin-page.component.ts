import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { TournamentService } from 'src/app/shared/services/tournament.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  isClick = false;
  tournaments = [];

  constructor(
    private auth: AuthService,
    private tournamentService: TournamentService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getTournaments();
  }

  getTournaments() {
    this.tournamentService.get().pipe(map(res => {
      let tournaments = [];
      res.map(tour => {
        tournaments.push({ id: tour._id, name: tour.name });
      })
      return tournaments;
    })).subscribe(data => {
      this.tournaments = data;
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
