import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { END_POINT } from 'src/app/shared/services/api-registry';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-all-schedules',
  templateUrl: './all-schedules.component.html',
  styleUrls: ['./all-schedules.component.scss']
})
export class AllSchedulesComponent implements OnInit {
  schedules = [];
  pageActual = 1;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getSchedule();
  }

  getSchedule(): void {
    this.apiService.get([END_POINT.matches])
      .subscribe(returnedSchedules => {
        let group_to_values = returnedSchedules.reduce(function (obj, item) {
          obj[item.start_at] = obj[item.start_at] || [];
          obj[item.start_at].push({ firstTeam: item.firstTeam, secondTeam: item.secondTeam });
          return obj;
        }, {});
        
        let groups = Object.keys(group_to_values).map(function (key) {
            return {group: key, data: group_to_values[key]};
        });

        this.schedules = groups;
      })
  }

}
