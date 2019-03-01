import { Component, Renderer, ViewChild, ElementRef, Input, EventEmitter, Output } from '@angular/core';
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
export class NextMatchComponent {
  @Output() updateSchedule: EventEmitter<Event> = new EventEmitter();
  @Input("match") match: any;
  _match = {};
  @ViewChild("modal", { read: ElementRef }) modal: ElementRef;
  @ViewChild("elmForm", { read: ElementRef }) elmForm: ElementRef
  flag = true;

  constructor(
    private auth: AuthService,
    private router: Router,
    private renderer: Renderer,
    private apiService: ApiService
  ) { }

  submit(f: NgForm, match) {
    const data = {
      match_id: match.id,
      user_id: this.auth.currentUser.sub,
      scorePrediction: [f.value.firstTeamPrediction, f.value.secondTeamPrediction],
      tournament_team_id: [match.firstTeam.firstTeamId, match.secondTeam.secondTeamId]
    };

    let url = [END_POINT.prediction + '/new'];
    if (this.auth.currentUser.admin) {
      url = [END_POINT.matches + '/update'];
      data.scorePrediction = [f.value.firstTeamScoreValue, f.value.secondTeamScoreValue];
      // data.winners = [f.value.firstTeamWinner, f.value.secondTeamWinner];
    }
    this.apiService.post(url, data).subscribe(code => {
      if (code === 200) {
        this.match = match;
        this.closeModal();
      } else {
        alert("Time out to predict !");
      }
    });
  };

  openMatch(match) {
    if (match.id) {
      this.router.navigate([END_POINT.match_detail + '/' + match.id]);
    } else {
      alert("Match have not id!");
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
    this._match = match;
    this.renderer.setElementAttribute(this.modal.nativeElement, "style", "display: block");
  }

  closeModal() {
    this.renderer.setElementAttribute(this.modal.nativeElement, "style", "display: none");
  }

  resetForm() {
    this.elmForm.nativeElement.reset();
  }

  callUpdateSchedule() {
    this.updateSchedule.emit();
  }
}
