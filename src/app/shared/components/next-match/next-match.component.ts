import { Component, OnInit, Input, OnChanges, Renderer, ViewChild, ElementRef } from '@angular/core';
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
export class NextMatchComponent implements OnInit, OnChanges {

  @Input("match") match = {};
  _match = {};
  @ViewChild("modal", { read: ElementRef }) modal: ElementRef;
  @ViewChild("elmForm", { read: ElementRef }) elmForm: ElementRef
  firstPredictionValue: Number;
  secondPredictionValue: Number;
  firstTeamScoreValue: Number;
  secondTeamScoreValue: Number;
  indexMatch: number;
  flag = true;

  constructor(
    private auth: AuthService,
    private router: Router,
    private renderer: Renderer,
    private apiService: ApiService
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
  }

  submit(f: NgForm, match) {
    const data = {
      match_id: match.id,
      user_id: this.auth.currentUser.sub,
      scorePrediction: [f.value.firstPrediction, f.value.secondPrediction],
      tournament_team_id: [match.firstTeam.firstTeamId, match.secondTeam.secondTeamId]
    };
    let url = [END_POINT.prediction + '/new'];
    if (this.auth.currentUser.admin) {
      url = [END_POINT.matches + '/update'];
    }
    this.apiService.post(url, data).subscribe(code => {
      if (code === 200) {
        this.closeModal();
      } else {
        alert("Time out to predict !");
      }
    });
  };

  openModal(match) {
    if (!this.auth.isLoggedIn()) {
      return this.router.navigate(['/login'], { queryParams: {
        returnUrl: this.router.url
      }})
    }
    this._match = match;
    this.renderer.setElementAttribute(this.modal.nativeElement, "style", "display: block");
  }

  closeModal() {
    this.resetForm();
    this.renderer.setElementAttribute(this.modal.nativeElement, "style", "display: none");
  }

  resetForm() {
    this.elmForm.nativeElement.reset();
  }
}
