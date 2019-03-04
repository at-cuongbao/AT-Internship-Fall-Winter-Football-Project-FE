import { Component, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { END_POINT } from 'src/app/shared/services/api-registry';

@Component({
  selector: 'app-next-match',
  templateUrl: './next-match.component.html',
  styleUrls: ['./next-match.component.scss']
})
export class NextMatchComponent {
  @Output() updateSchedule = new EventEmitter();
  @Input("match") match: any;
  matchData = [];

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  openMatch(match) {
    if (match.id) {
      this.router.navigate([END_POINT.match_detail + '/' + match.id]);
    } else {
      alert("Can not find match id!");
    }
  }

  openModal(match) {
    if (!this.auth.isLoggedIn()) {
      return this.router.navigate(['/login'], {
        queryParams: {
          returnUrl: this.router.url
        }
      })
    }
    this.matchData.push(match);
  }

  onSubmit(match: any) {
    if (match) {
      this.updateSchedule.emit(match.id);
    } 
    this.matchData = [];
  }
}
