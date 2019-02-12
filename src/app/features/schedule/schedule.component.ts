import { Component, OnInit } from '@angular/core';
import { ScheduleService } from 'src/app/shared/services/schedule.service';
import { AuthService } from 'src/app/shared/services/auth.service';

const GROUPS = ["A", "B", "C", "D", "E", "F", "G", "H"];

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  schedules = [];
  imgDefault = '../../../assets/images/default-image.png';

  constructor(
    private scheduleService: ScheduleService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.init();
    this.getSchedule();
  }

  init() {
    GROUPS.map(group => {
      let tables = [];
      for(let i = 0; i < 6; i++) {
        tables.push(
          {
            firstTeam: {
              code: null,
              logo: null,
              score: null
            },
            secondTeam: {
              code: null,
              logo: null,
              score: null
            },
            start_at: null,
            round: 1
          }
        );
      }
      this.schedules.push({
        groupName: group,
        matches: tables
      });
    });
  }

  getSchedule(): void {
    
    this.scheduleService.get("5c4fbbaa0b614f0a24019243")
      .subscribe(schedules => {
        this.schedules = [];
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
            } else if (match.round > 3 && match.round < 4) {
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
