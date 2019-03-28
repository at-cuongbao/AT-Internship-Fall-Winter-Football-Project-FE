import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { END_POINT } from 'src/app/shared/services/api-registry';
import { Match } from 'src/app/shared/models/match';

@Component({
  selector: 'app-prediction-list',
  templateUrl: './prediction-list.component.html',
  styleUrls: ['./prediction-list.component.scss']
})
export class PredictionListComponent implements OnInit {
  predictions = [];
  pageActual = 1;
  matchData = [];
  isClickTagA = false;
  showLoadingIndicator = true;

  constructor(
    private apiService: ApiService, 
    private router: Router,
    private auth: AuthService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getSchedule();
  }

  getSchedule() {
    let userId = this.auth.currentUser.sub;
    let url = (this.auth.currentUser && 
      this.auth.currentUser.admin) ? `${END_POINT.prediction}/showAdmin` : 
      `${END_POINT.prediction}/${userId}`;

    this.apiService.get([url])
      .subscribe(returnedPredictions => {
        if (returnedPredictions) {
          let group_to_values = returnedPredictions.reduce(function (obj, item) {
            obj[item.match_id.start_at] = obj[item.match_id.start_at] || [];
            obj[item.match_id.start_at].push({ start_at: item.match_id.start_at, id: item.match_id._id, prediction: item.prediction, tournamentName: item.match_id.tournamentId.name, firstTeam: item.firstTeam, secondTeam: item.secondTeam });
            return obj;
          }, {});
  
          let groups = Object.keys(group_to_values).map(function (key) {
            return { group: key, data: group_to_values[key] };
          });
          this.predictions = groups.sort((a, b) => a.group > b.group ? 1 : -1);
        }
        this.showLoadingIndicator = false;
      })
  }

  openMatchDetail(match: any) {
    if (match.firstTeam.code && match.secondTeam.code) {
      if (!this.isClickTagA && match.id) {
        this.router.navigate([END_POINT.match_detail + '/' + match.id]);
      }
      // Handle when clicking a button in a li tag.
      this.isClickTagA = !this.isClickTagA;
    }
  }

  openModal(match: Match) {
    this.isClickTagA = !this.isClickTagA;
    if (!this.auth.isLoggedIn()) {
      return this.router.navigate(['/login'], { queryParams: {
        returnUrl: this.router.url
      }})
    }
    this.matchData.push(match);
  }

  onSubmit(match: Match) {
    if (match) {
      this.spinner.show();
      this.getSchedule();
    } 
    this.matchData = [];
  }
}
