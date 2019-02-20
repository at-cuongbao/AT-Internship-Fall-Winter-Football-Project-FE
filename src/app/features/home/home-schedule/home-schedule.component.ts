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
    for (let i = 0; i < 7; i++) {
      this.matches.push(
        {
          start_at: '01/01',
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
    this.route.paramMap.subscribe((params: ParamMap) => {
    });
    this.scheduleService.getNextMatch()
      .subscribe(match => {
        this.matches = [];
        match.map(match => {
          if (this.matches.length < 7) {
            this.matches.push(match);
          };
        });
        this.matches.sort((a,b) => (a.start_at > b.start_at) ? 1 : ((b.start_at > a.start_at) ? -1 : 0));
      });
    }
}
