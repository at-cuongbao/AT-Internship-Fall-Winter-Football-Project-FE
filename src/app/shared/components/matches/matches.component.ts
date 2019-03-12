import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { END_POINT } from '../../services/api-registry';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {
  @Input() matches: any;
  @Input() home = true;
  @Output() openModal = new EventEmitter<any>();
  @Output() getNextMatch = new EventEmitter<any>();
  @Input() flag = true;
  isClickTagA = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.sortMatch(this.matches);
  }

  sortMatch(matches) {
    matches.sort((a, b) => (a.start_at > b.start_at) ? 1 : -1);
  }

  openMatchDetail(match: any) {
    if (this.home) {
      this.getNextMatch.emit(match);
    } else {
      if (!this.isClickTagA && match.id) {
        this.router.navigate([END_POINT.match_detail + '/' + match.id]);
      }
      // Handle when clicking a button in a li tag.
      this.isClickTagA = !this.isClickTagA;
    }
  }

  open(match: any) {
    this.isClickTagA = !this.isClickTagA;
    this.openModal.emit(match);
  }
}
