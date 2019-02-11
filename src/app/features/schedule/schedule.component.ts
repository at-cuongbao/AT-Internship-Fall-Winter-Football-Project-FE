import { Component, OnInit } from '@angular/core';
import { ScheduleService } from 'src/app/shared/services/schedule.service';
import { AuthService } from 'src/app/shared/services/auth.service';

const GROUPS = ["A", "B", "C", "D", "E", "F", "H", "G"];

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  schedules = [];

  constructor(
    private scheduleService: ScheduleService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.getSchedule();
  }

  getSchedule(): void {
    this.scheduleService.get("5c4fbbaa0b614f0a24019243")
      .subscribe(schedules => {
        let quarters = [];
        let semis = [];
        let finals = [];
        
        GROUPS.map(group => {
          let tables = [];
          schedules.map(match => {
            if (match.group === group && match.round == 1) {
              tables.push(match);
            } 
          });
          this.schedules.push({
            groupName: group,
            matches: tables
          });
        });

        schedules.map(match => {
          if (!match.group) {
            if (match.round > 1 && match.round < 3) {
              quarters.push(match);
            } else if (match.round > 3  && match.round < 4) {
              semis.push(match);
            } else {
              finals.push(match);
            }
          }
        });

        this.schedules.push({
            groupName: 'Quater-final',
            matches: quarters
          }, {
            groupName: 'Semi-final',
            matches: semis
          }, {
            groupName: 'Final and third',
            matches: finals
          },
        );
      })
  }
}
