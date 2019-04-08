import { Component } from '@angular/core';
import { ScheduleService } from 'src/app/shared/services/schedule.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ActivatedRoute, ParamMap, Router, NavigationEnd } from '@angular/router';
import { MatchService } from 'src/app/shared/services/match.service';
import { Match } from '../../shared/models/match';
import { TransportService } from 'src/app/shared/services/transport.service';

const GROUPS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent {
  schedules = [];
  tablesFlags = [];
  matchData = [];
  groupData = [];
  knockoutData = [];
  tournamentName = '';

  // Default images.
  imageSource = '../../../assets/images/tr.png';
  imgDefault = '../../../assets/images/default-image.png';

  showLoadingIndicator = true;
  isOpenSetKnockout = false;

  constructor(
    private scheduleService: ScheduleService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private matchService: MatchService,
    private grab: TransportService,
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.showLoadingIndicator = true;
        this.getSchedule();
      }
    });
   }

  getSchedule(): void {
    let id: string;
    let count = 0;

    this.route.paramMap.subscribe((params: ParamMap) => (id = params.get('id')));
    this.scheduleService.get(id)
      .subscribe(schedulesTotal => {
        let [tournamentName, schedules, tablesFlags] = schedulesTotal;
        let knockouts = [];
        let quarters = [];
        let semis = [];
        let finals = [];

        this.tablesFlags = tablesFlags;
        this.schedules = [];
        this.tournamentName = tournamentName;
        GROUPS.map(group => {
          let tables = [];
          schedules.map(match => {
            if (match.group === group && match.round === 1) {
              tables.push(match);
            }
          });
          this.schedules.push({
            groupName: `Group ${group}`,
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
              if (count === 0 && match.round === 4.1 && !scheduleCheck) {
                count = 1;
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

        this.schedules.push(
          {
            groupName: 'Quater-finals',
            matches: quarters
          },
          {
            groupName: 'Semi-finals',
            matches: semis
          },
          {
            groupName: 'Finals',
            matches: finals
          }
        );
        this.showLoadingIndicator = false;
      }, error => console.log(error));
    this.getTopTeam();
  }

  openModal(match: Match) {
    if (!this.auth.isLoggedIn()) {
      return this.router.navigate(['/login'], {
        queryParams: {
          returnUrl: this.router.url
        }
      })
    }
    this.matchData.push(match);
  }

  onSubmit(match: Match) {
    if (match) {
      this.getSchedule();
      this.getSchedule();
    }
    this.matchData = [];
  }

  getTopTeam() {
    let tournamentId = this.route.snapshot.paramMap.get('id');
    this.matchService.getTopTeams(tournamentId)
      .subscribe(data => {
        if (data) {
          this.groupData = data;
        }
      })
  }

  onSetKnockout(groupIndex: number) {
    this.knockoutData = [];
    const teamNumber = 4 * groupIndex + 4;
    for (let index = 4 * groupIndex; index < teamNumber; index++) {
      this.knockoutData.push(this.groupData[index]);
    }
    this.isOpenSetKnockout = true;
  }

  closeModal(event: any) {
    if (event.action == 'submit') {
      this.getSchedule();
    }
    this.isOpenSetKnockout = false;
  }
}
