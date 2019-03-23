import { Component, OnInit, Input, Output, EventEmitter, OnChanges, OnDestroy, DoCheck } from '@angular/core';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss']
})
export class CountdownTimerComponent implements OnInit, OnChanges, OnDestroy, DoCheck {
  @Input() end: any;
  @Input() isHomePage = false;
  @Output() finished = new EventEmitter();
  dayLeft;
  hrsLeft;
  minLeft;
  secLeft;

  constructor() {
  }

  ngOnChanges() {
    console.log('ngOnChanges', this.dayLeft);

    this.coutdown(new Date(this.end).getTime());
  }

  ngDoCheck() {
    console.log('ngDoCheck', this.dayLeft);
    
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.end = null;
  }

  coutdown(end: any) {
    const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;
    let x = setInterval(() => {
      let now = new Date().getTime(),
        distance = end - now;
      this.dayLeft = '' + Math.floor(distance / (day));
      this.hrsLeft = '' + Math.floor((distance % (day)) / (hour));
      this.minLeft = '' + Math.floor((distance % (hour)) / (minute));
      this.secLeft = '' + Math.floor((distance % (minute)) / second);

      if (Math.floor((distance % (day)) / (hour)) < 10) {
        this.hrsLeft = '0' + this.hrsLeft;
      }
      if (Math.floor((distance % (hour)) / (minute)) < 10) {
        this.minLeft = '0' + this.minLeft;
      }
      if (Math.floor((distance % (minute)) / second) < 10) {
        this.secLeft = '0' + this.secLeft;
      }

      //do something later when date is reached
      if (distance < 0) {
        clearInterval(x);
        this.finished.emit();
      }
    }, second)
  }

}
