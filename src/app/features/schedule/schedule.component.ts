import { Component, OnInit } from '@angular/core';
import { ScheduleService } from 'src/app/shared/services/schedule.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ActivatedRoute, ParamMap, Router, NavigationEnd } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

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
  data4 = [
    {
      firstTeam: {
        firstTeamId: "5c7f996b1329561d847789d1",
        code: "BAY",
        logo: "../../../assets/images/../../../assets/images/Bayern.png",
        score: "3",
        winner: false
      },
      group: "C",
      id: "5c7f996c1329561d847789f5",
      prediction: {
        isAllow: true, is_predicted: false,
        firstTeam_score_prediction: "",
        secondTeam_score_prediction: ""
      },
      round: 1,
      secondTeam: {
        secondTeamId: "5c7f996b1329561d847789d2",
        code: "LIV", logo: "../../../assets/images/../../../assets/images/Liver.png",
        score: "1",
        winner: false
      },
      start_at: "2018-12-11T11:00:00.000Z"
    },
    {
      firstTeam: {
        firstTeamId: "5c7f996b1329561d847789d1",
        code: "DOR",
        logo: "../../../assets/images/../../../assets/images/Dortmund.png",
        score: "1",
        winner: false
      },
      group: "C",
      id: "5c7f996c1329561d847789f5",
      prediction: {
        isAllow: true, is_predicted: false,
        firstTeam_score_prediction: "",
        secondTeam_score_prediction: ""
      },
      round: 1,
      secondTeam: {
        secondTeamId: "5c7f996b1329561d847789d2",
        code: "CHE", logo: "../../../assets/images/../../../assets/images/chel.png",
        score: "2",
        winner: false
      },
      start_at: "2018-12-10T11:00:00.000Z"
    },
    {
      firstTeam: {
        firstTeamId: "5c7f996b1329561d847789d1",
        code: "MU",
        logo: "../../../assets/images/../../../assets/images/Mu.png",
        score: "2",
        winner: false
      },
      group: "C",
      id: "5c7f996c1329561d847789f5",
      prediction: {
        isAllow: true, is_predicted: false,
        firstTeam_score_prediction: "",
        secondTeam_score_prediction: ""
      },
      round: 1,
      secondTeam: {
        secondTeamId: "5c7f996b1329561d847789d2",
        code: "PSG", logo: "../../../assets/images/../../../assets/images/Psg.png",
        score: "2",
        winner: true
      },
      start_at: "2018-12-09T11:00:00.000Z"
    },
    {
      firstTeam: {
        firstTeamId: "5c7f996b1329561d847789d1",
        code: "REA",
        logo: "../../../assets/images/../../../assets/images/Real.png",
        score: "3",
        winner: false
      },
      group: "C",
      id: "5c7f996c1329561d847789f5",
      prediction: {
        isAllow: true, is_predicted: false,
        firstTeam_score_prediction: "",
        secondTeam_score_prediction: ""
      },
      round: 1,
      secondTeam: {
        secondTeamId: "5c7f996b1329561d847789d2",
        code: "MON", logo: "../../../assets/images/../../../assets/images/Monaco.png",
        score: "4",
        winner: false
      },
      start_at: "2018-12-08T11:00:00.000Z"
    }
  ];
  data2 = [
    {
      firstTeam: {
        firstTeamId: "5c7f996b1329561d847789d1",
        code: "MON",
        logo: "../../../assets/images/../../../assets/images/Monaco.png",
        score: "3",
        winner: false
      },
      group: "C",
      id: "5c7f996c1329561d847789f5",
      prediction: {
        isAllow: true, is_predicted: false,
        firstTeam_score_prediction: "",
        secondTeam_score_prediction: ""
      },
      round: 1,
      secondTeam: {
        secondTeamId: "5c7f996b1329561d847789d2",
        code: "PSG", logo: "../../../assets/images/../../../assets/images/Psg.png",
        score: "1",
        winner: false
      },
      start_at: "2018-12-14T11:00:00.000Z"
    },
    {
      firstTeam: {
        firstTeamId: "5c7f996b1329561d847789d1",
        code: "BAY",
        logo: "../../../assets/images/../../../assets/images/Bayern.png",
        score: "1",
        winner: false
      },
      group: "C",
      id: "5c7f996c1329561d847789f5",
      prediction: {
        isAllow: true, is_predicted: false,
        firstTeam_score_prediction: "",
        secondTeam_score_prediction: ""
      },
      round: 1,
      secondTeam: {
        secondTeamId: "5c7f996b1329561d847789d2",
        code: "CHE", logo: "../../../assets/images/../../../assets/images/chel.png",
        score: "2",
        winner: false
      },
      start_at: "2018-12-12T11:00:00.000Z"
    }
  ];
  data1 = [
    {
      firstTeam: {
        firstTeamId: "5c7f996b1329561d847789d1",
        code: "MON",
        logo: "../../../assets/images/../../../assets/images/Monaco.png",
        score: "3",
        winner: false
      },
      group: "C",
      id: "5c7f996c1329561d847789f5",
      prediction: {
        isAllow: true, is_predicted: false,
        firstTeam_score_prediction: "",
        secondTeam_score_prediction: ""
      },
      round: 1,
      secondTeam: {
        secondTeamId: "5c7f996b1329561d847789d2",
        code: "CHE", logo: "../../../assets/images/../../../assets/images/chel.png",
        score: "2",
        winner: false
      },
      start_at: "2018-12-12T11:00:00.000Z"
    }
  ];
  dem = 0;

  constructor(
    private scheduleService: ScheduleService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { 
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.spinner.show();
        this.getSchedule();
      }
    });
  }

  ngOnInit() {
    this.spinner.show();
  }

  getSchedule(): void {
    let id: string;
    this.dem = 0;
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


        schedules.map((match, index) => {
          if (match.round !== 1) {
            if (match.round < 3) {
              quarters.push(match);
            } else if (match.round < 4) {
              semis.push(match);
            } else {
              if (this.dem === 0) {
                this.dem = 1;
                finals.push(match);
              }
            }
          }
        });
        
        if (id === '5c7f996b1329561d847789c8') {
          quarters = [];
          semis = [];
          finals = [];
          this.data4.map(match => {
            quarters.push(match);
          })
          this.data2.map(match => {
            semis.push(match);
          })
          this.data1.map(match => {
            finals.push(match);
          })
        }

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

        this.spinner.hide();
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
      this.spinner.show();
      this.getSchedule();
    } 
    this.matchData = [];
  }
}
