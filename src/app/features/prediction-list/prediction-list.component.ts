import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { END_POINT } from 'src/app/shared/services/api-registry';

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

  getSchedule(): void {
    let userId = this.auth.currentUser.sub;
    this.apiService.get([`${END_POINT.prediction}/${userId}`])
      .subscribe(returnedPredictions => {
        if (returnedPredictions) {
          let group_to_values = returnedPredictions.reduce(function (obj, item) {
            obj[item.match_id.start_at] = obj[item.match_id.start_at] || [];
            obj[item.match_id.start_at].push({ id: item.match_id._id, tournamentName: item.match_id.tournamentId.name, firstTeam: item.firstTeam, secondTeam: item.secondTeam });
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
    this.router.navigate([END_POINT.match_detail + '/' + match.id]);
  }

  openModal(match) {
    if (!this.auth.isLoggedIn()) {
      return this.router.navigate(['/login'], { queryParams: {
        returnUrl: this.router.url
      }})
    }
    this.matchData.push(match);
  }

  onSubmit(match: any) {
    if (match) {
      this.spinner.show();
      this.getSchedule();
    } 
    this.matchData = [];
  }
}
