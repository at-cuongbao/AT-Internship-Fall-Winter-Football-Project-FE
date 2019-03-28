import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { END_POINT } from 'src/app/shared/services/api-registry';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Match } from 'src/app/shared/models/match';

@Component({
  selector: 'app-all-schedules',
  templateUrl: './all-schedules.component.html',
  styleUrls: ['./all-schedules.component.scss']
})
export class AllSchedulesComponent implements OnInit {
  pageActual = 1;
  schedules = [];
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
    this.apiService.get([END_POINT.matches])
      .subscribe((returnedSchedules: Array<any>) => {
        let group_to_values = returnedSchedules.reduce(function (obj, item) {
          obj[item.start_at] = obj[item.start_at] || [];
          obj[item.start_at].push({ id: item.id, tournamentName: item.tournamentName, firstTeam: item.firstTeam, secondTeam: item.secondTeam });
          return obj;
        }, {});

        let groups = Object.keys(group_to_values).map(function (key) {
          return { group: key, data: group_to_values[key] };
        });

        this.schedules = groups.sort((a, b) => a.group < b.group ? 1 : -1);
        this.showLoadingIndicator = false;
      })
  }

  openMatchDetail(match: Match) {
    this.router.navigate([END_POINT.match_detail + '/' + match.id]);
  }

  openModal(match: Match) {
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
