import { Component, OnInit, ElementRef } from '@angular/core';
import { ScheduleService } from 'src/app/shared/services/schedule.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  matches = [];
  match = {};
  imgDefault = '../../../assets/images/default-image.png';

  constructor(
    private scheduleService: ScheduleService,
    private elem: ElementRef
  ) { }

  ngOnInit() {
    this.init();
    this.getMatches();
  }

  ngAfterViewInit() {
    let home_next_match = this.elem.nativeElement.querySelectorAll(".home-next-match");
    let home_schedule = this.elem.nativeElement.querySelectorAll('.home-schedule');
    home_next_match[0].style.height = home_schedule[0].offsetHeight + 'px';
  }

  init() {
    this.matches = [];
    for (let i = 0; i < 7; i++) {
      this.matches.push(
        {
          start_at: '02/02/2020',
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
    this.match = this.matches[0];
  }

  getMatches(): void {
    this.scheduleService.getNextMatch()
      .subscribe(matches => {
        this.matches = matches;
        this.matches.sort((a, b) => (a.start_at > b.start_at) ? 1 : -1);
        this.match = matches[0];
      });
  }

  getNextMatch(match: any) {
    this.match = match;
  }

}
