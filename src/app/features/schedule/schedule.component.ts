import { Component, OnInit } from '@angular/core';
import { ScheduleService } from 'src/app/shared/services/schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  schedules: any;

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit() {
    this.getSchedule();
  }

  getSchedule(): void {
    this.scheduleService.get("5c40509df48d6c304ca351c8")
      .subscribe(schedules => this.schedules = schedules);
  }
}
