import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { END_POINT } from 'src/app/shared/services/api-registry';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-all-schedules',
  templateUrl: './all-schedules.component.html',
  styleUrls: ['./all-schedules.component.scss']
})
export class AllSchedulesComponent implements OnInit {
  schedules = [];
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
    this.apiService.get([END_POINT.matches])
      .subscribe(returnedSchedules => {
        let group_to_values = returnedSchedules.reduce(function (obj, item) {
          obj[item.start_at] = obj[item.start_at] || [];
          obj[item.start_at].push({ id: item.id, tournamentName: item.tournamentName, firstTeam: item.firstTeam, secondTeam: item.secondTeam });
          return obj;
        }, {});

        let groups = Object.keys(group_to_values).map(function (key) {
          return { group: key, data: group_to_values[key] };
        });
        
        this.schedules = groups.sort((a, b) => a.group > b.group ? 1 : -1);
        console.log(this.schedules);
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
