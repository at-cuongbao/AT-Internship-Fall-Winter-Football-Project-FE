import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home-schedule',
  templateUrl: './home-schedule.component.html',
  styleUrls: ['./home-schedule.component.scss']
})
export class HomeScheduleComponent implements OnInit {

  @Input("data") matches = [];

  constructor() { }

  ngOnInit() {
  }
}
