import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  schedules = [];

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.getServices();
    setTimeout(() => {
      console.log(this.schedules);
    }, 3000);
  }

  getServices(): void {
    const url = "assets/data.json";
    this.api.get([url])
      .subscribe(schedules => this.schedules = schedules);
  }

}

