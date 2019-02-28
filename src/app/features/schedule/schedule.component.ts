import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { ScheduleService } from 'src/app/shared/services/schedule.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { END_POINT } from 'src/app/shared/services/api-registry';
import { ApiService } from 'src/app/shared/services/api.service';

const GROUPS = ["A", "B", "C", "D", "E", "F", "G", "H"];

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  schedules = [];
  _match = {};
  @ViewChild("modal", { read: ElementRef }) modal: ElementRef;
  @ViewChild("elmForm", { read: ElementRef }) elmForm: ElementRef
  imageSource = '../../../assets/images/tr.png';
  imgDefault = '../../../assets/images/default-image.png';
  flag = true;
  firstTeam_score_prediction;
  secondTeam_score_prediction;

  constructor(
    private scheduleService: ScheduleService,
    private auth: AuthService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer
  ) { }

  ngOnInit() {
    this.init();
    this.getSchedule();
  }

  init() {
    GROUPS.map(group => {
      let tables = [];
      for (let i = 0; i < 6; i++) {
        tables.push(
          {
            firstTeam: {
              code: null,
              logo: this.imgDefault,
              score: null
            },
            secondTeam: {
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
    let id;
    this.route.paramMap.subscribe((params: ParamMap) => {
      id = params.get('id') || '5c4fbbaa0b614f0a24019243';
    });
    this.scheduleService.get(id)
      .subscribe(schedules => {
        this.flag = false;
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

        this.schedules.push(
          {
            groupName: 'Quater-final',
            matches: quarters
          },
          {
            groupName: 'Semi-final',
            matches: semis
          },
          {
            groupName: 'Final and third',
            matches: finals
          },
        );
      })
  }

  submit(f: NgForm, match) {
    const data = {
      date: new Date().getTime(),
      match_id: match.id,
      user_id: this.auth.currentUser.sub,
      scorePrediction: [f.value.firstPrediction, f.value.secondPrediction],
      tournament_team_id: [match.firstTeam.firstTeamId, match.secondTeam.secondTeamId]
    };
    let url = [END_POINT.prediction + '/new'];
    if (this.auth.currentUser.admin) {
      url = [END_POINT.matches + '/update'];
      data.scorePrediction = [f.value.firstTeamScore, f.value.secondTeamScore];
      // data.winners = [f.value.firstTeamWinner, f.value.secondTeamWinner];
    }
    this.apiService.post(url, data).subscribe(code => {
      if (code === 200) {
        this.closeModal();
        this.getSchedule();
      } else {
        alert("Time out to predict !");
      }
    });
  };

  openModal(match) {
    this.firstTeam_score_prediction = match.prediction.firstTeam_score_prediction;
    this.secondTeam_score_prediction = match.prediction.secondTeam_score_prediction;
    if (!this.auth.isLoggedIn()) {
      return this.router.navigate(['/login'], { queryParams: {
        returnUrl: this.router.url
      }})
    }
    this._match = match;
    this.renderer.setElementAttribute(this.modal.nativeElement, "style", "display: block");
  }

  closeModal() {
    this.renderer.setElementAttribute(this.modal.nativeElement, "style", "display: none");
  }

  resetForm() {
    this.elmForm.nativeElement.reset();
  }
}
