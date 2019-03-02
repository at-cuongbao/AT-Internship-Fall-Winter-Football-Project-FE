import { Component, Renderer, ViewChild, ElementRef, Input, EventEmitter, Output, DoCheck } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { END_POINT } from 'src/app/shared/services/api-registry';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-next-match',
  templateUrl: './next-match.component.html',
  styleUrls: ['./next-match.component.scss']
})
export class NextMatchComponent implements DoCheck {
  @Output() updateSchedule: EventEmitter<Event> = new EventEmitter();
  @Input("match") match: any;
  matchData = [];
  _match = {};
  flag = true;
  firstTeamPrediction_ngModel;
  secondTeamPrediction_ngModel;
  firstTeamScore_ngModel;
  secondTeamScore_ngModel;

  constructor(
    private auth: AuthService,
    private router: Router,
    private renderer: Renderer,
    private apiService: ApiService
  ) { }

  ngDoCheck() {
  }

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
      this.callUpdateSchedule();
      this.match = match;
    } 
    this.matchData = [];
  }

  callUpdateSchedule() {
    this.updateSchedule.emit();
  }
}
