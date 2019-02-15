import { Component, OnInit, Renderer } from '@angular/core';
import { ScheduleService } from 'src/app/shared/services/schedule.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-home-schedule',
  templateUrl: './home-schedule.component.html',
  styleUrls: ['./home-schedule.component.scss']
})
export class HomeScheduleComponent implements OnInit {

  imgDefault = '../../../assets/images/default-image.png';
  matches = [];

  constructor(
    private scheduleService: ScheduleService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.init();
    this.getMatches();
  }

  init() {
    this.matches = [];
    for (let i = 0; i < 10; i++) {
      this.matches.push(
        {
          start_at: '01/01/2020',
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
        }
      );
    }
  }

  getMatches(): void {
    let id;
    this.route.paramMap.subscribe((params: ParamMap) => {
      id = params.get('id') || '5c4fbbaa0b614f0a24019243';
    });
    this.scheduleService.get(id)
      .subscribe(schedules => {
        this.matches = [];
        schedules.map(match => {
          if (this.matches.length < 10) {
            this.matches.push(match);
          };
        });
      });
    }
}
