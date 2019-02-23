import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { END_POINT } from '../../services/api-registry';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent {
  @Input() matches: any;
  @Input() home = true;
  @Output() openModal = new EventEmitter<any>();
  isClickTagA = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  openMatchDetail(match: any) {
    if (!this.isClickTagA) {
      this.router.navigate([END_POINT.match_detail + match.id]);
    }
    // handle when click button in li tag
    this.isClickTagA = !this.isClickTagA;
  }

  open(match: any) {
    this.isClickTagA = !this.isClickTagA;
    this.openModal.emit(match);
  }

}
