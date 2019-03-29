import { Component, OnInit } from '@angular/core';
import { ScheduleService } from 'src/app/shared/services/schedule.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ActivatedRoute, ParamMap, Router, NavigationEnd } from '@angular/router';
import { MatchService } from 'src/app/shared/services/match.service';

const GROUPS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

@Component({
  selector: 'app-tournament-results',
  templateUrl: './tournament-results.component.html',
  styleUrls: ['./tournament-results.component.scss']
})
export class TournamentResultsComponent implements OnInit {

  schedules = [];
  matchData = [];
  groupData = [];
  imageSource = '../../../assets/images/tr.png';
  imgDefault = '../../../assets/images/default-image.png';
  showLoadingIndicator = true;
  dem = 0;
  knockoutData = null;
  isOpenSetKnockout = false;
  flag = true;

  constructor(
    private scheduleService: ScheduleService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private matchService: MatchService,
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.showLoadingIndicator = true;
        this.getSchedule();
      }
    });
  }

  ngOnInit() { }

  getSchedule(): void {
    let id: string;
    this.dem = 0;
    this.route.paramMap.subscribe((params: ParamMap) => {
      id = params.get('id') || '';
    });
    this.scheduleService.get(id)
      .subscribe(_schedules => {
        let schedules = _schedules[0].filter(match => {
          return match.firstTeam.score !== null
        });
        if(schedules.length === 0) this.flag = false
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
              if (this.dem === 0 && match.round === 4.1 && !scheduleCheck) {
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
            groupName: 'emi-final',
            matches: semis
          }, {
            groupName: 'Final',
            matches: finals
          });
          
        this.showLoadingIndicator = false;
      }, error => console.log(error));

      this.getTopTeam();
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
}
