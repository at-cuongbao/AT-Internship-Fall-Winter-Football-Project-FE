import { Component, OnInit, Input } from '@angular/core';
import { ScheduleService } from '../../services/schedule.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  @Input() matches: any;

  constructor() { }

  ngOnInit() {
  }

}
