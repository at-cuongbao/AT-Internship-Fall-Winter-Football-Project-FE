import { Component, OnInit } from '@angular/core';
import { ScheduleService } from 'src/app/shared/services/schedule.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  matches=[];
  imgDefault = '../../../assets/images/default-image.png';

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit() {
    this.init();
    this.getMatches();
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
  }

  getMatches(): void {
    this.scheduleService.getNextMatch()
      .subscribe(matches => {
        this.matches = matches;
        this.matches.sort((a,b) => (a.start_at > b.start_at) ? 1 : 0);
      });
    }
}
