import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TournamentService } from '../../services/tournament.service';
import { map } from 'rxjs/operators';
import { TransportService } from '../../services/transport.service';

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
    private router: Router,
    private grab: TransportService,
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

  onClick(data) {
    this.grab.send(data);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
