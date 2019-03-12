import { Component, OnInit } from '@angular/core';
import { ScheduleService } from 'src/app/shared/services/schedule.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ActivatedRoute, ParamMap, Router, NavigationEnd } from '@angular/router';
import { fake_data } from '../../../assets/mock-match';

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
  showLoadingIndicator = true;
  dem = 0;

  constructor(
    private scheduleService: ScheduleService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.showLoadingIndicator = true;
        this.getSchedule();
      }
    });
  }

  ngOnInit() {}

  getSchedule(): void {
    let id: string;
    this.dem = 0;
    this.route.paramMap.subscribe((params: ParamMap) => {
      id = params.get('id') || '';
    });
    this.scheduleService.get(id)
      .subscribe(schedules => {
        this.schedules = [];
        let knockouts = [];
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

        let scheduleCheck = schedules.length > 32 ? true : false;
        schedules.map(match => {
          if (match.round !== 1) {
            if (match.round < 3) {
              scheduleCheck ? knockouts.push(match) : quarters.push(match);
            } else if (match.round < 4) {
              scheduleCheck ? quarters.push(match) : semis.push(match);
            } else if (match.round < 5) {
              if (this.dem === 0 && match.round === 4.1 && !scheduleCheck){
                this.dem = 1;
                finals.push(match);
              } 
              if (scheduleCheck) {
                semis.push(match);
              }
            }
            if (match.round === 5.1) {
              finals.push(match)
            }
          }
        });
        scheduleCheck ? this.schedules.push({ groupName: 'Knockout', matches: knockouts }) : '';
     
        this.schedules.push({
          groupName: 'Quater-final',
          matches: quarters
        }, {
          groupName: 'Semi-final',
          matches: semis
        }, {
          groupName: 'Final',
          matches: finals
        });
        this.showLoadingIndicator = false;
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
