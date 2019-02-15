import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-schedule',
  templateUrl: './home-schedule.component.html',
  styleUrls: ['./home-schedule.component.scss']
})
export class HomeScheduleComponent implements OnInit {

  imgDefault = '../../../assets/images/default-image.png';
  matches = [
    {
      start_at: "1/1/1999",
      firstTeam: {
        logo: this.imgDefault,
        code: 'ABC',
        score: '1'
      },
      secondTeam: {
        logo: this.imgDefault,
        code: 'ABC',
        score: '1'
      }
    },
    {
      start_at: "1/1/1999",
      firstTeam: {
        logo: this.imgDefault,
        code: 'ABC',
        score: '1'
      },
      secondTeam: {
        logo: this.imgDefault,
        code: 'ABC',
        score: '1'
      }
    }
  ];


  constructor() { }

  ngOnInit() {
  }

}
