import { Component, OnInit } from '@angular/core';
import { ScheduleService } from 'src/app/shared/services/schedule.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ActivatedRoute, ParamMap, Router, NavigationEnd } from '@angular/router';

const GROUPS = ["A", "B", "C", "D", "E", "F", "G", "H"];

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  schedules = [];
  matchData = [];
  imageSource = '../../../assets/images/tr.png';
  imgDefault = '../../../assets/images/default-image.png';

  constructor(
    private scheduleService: ScheduleService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.getSchedule();
      }
    });
  }

  ngOnInit() {
    this.init();
  }

  init() {
    GROUPS.map(group => {
      let tables = [];
      for (let i = 0; i < 6; i++) {
        tables.push(
          {
            firstTeam: {
              id: null,
              code: null,
              logo: this.imgDefault,
              score: null
            },
            secondTeam: {
              id: null,
              code: null,
              logo: this.imgDefault,
              score: null
            },
            start_at: '1/1',
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
    let id: string;
    this.route.paramMap.subscribe((params: ParamMap) => {
      id = params.get('id') || '';
    });
    this.scheduleService.get(id)
      .subscribe(schedules => {
        this.schedules = [];
        let quarters = [];
        let semis = [];
        let finals = [];
        
        GROUPS.map(group => {
          let tables = [];
          schedules.map(match => {
            if (match.group === group && match.round === 1) {
              tables.push(match);
            }
          });
          this.schedules.push({
            groupName: group,
            matches: tables
          });
        });

        schedules.map(match => {
          if (match.round !== 1) {
            if (match.round < 3) {
              quarters.push(match);
            } else if (match.round < 4) {
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
        });
      })
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
      this.getSchedule();
    } 
    this.matchData = [];
  }
}
