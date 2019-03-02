import { Component, OnInit, ElementRef, DoCheck } from '@angular/core';
import { ScheduleService } from 'src/app/shared/services/schedule.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, DoCheck {
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

  ngDoCheck() {
    let home_next_match = this.elem.nativeElement.querySelectorAll(".home-next-match");
    let home_schedule = this.elem.nativeElement.querySelectorAll('.home-schedule');
    if (home_next_match[0])
    home_next_match[0].style.height = home_schedule[0].offsetHeight + 'px';
  }

  init() {
    this.matches = [];
    for (let i = 0; i < 7; i++) {
      this.matches.push(
        {
          start_at: '02/02/2020',
          firstTeam: {
            firstTeamId: null,
            code: null,
            logo: this.imgDefault,
            score: null
          },
          secondTeam: {
            secondTeamId: null,
            code: null,
            logo: this.imgDefault,
            score: null
          },
        }
      );
    }
    this.match = this.matches[0];
  }

  getMatches(match_id?): void {
    this.scheduleService.getNextMatch()
      .subscribe(matches => {
        this.matches = matches;
        this.matches.sort((a, b) => (a.start_at > b.start_at) ? 1 : -1);
        if (match_id) {
          matches.forEach(element => {
            if (element.id === match_id) {
              this.match = element;
              return;
            }
          });
        } else this.match = matches[0];
      });
  }

  getNextMatch(match: any) {
    this.match = match;
  }

}
