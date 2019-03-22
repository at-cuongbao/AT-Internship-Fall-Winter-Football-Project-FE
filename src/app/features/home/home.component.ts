import { Component, OnInit, ElementRef, DoCheck } from '@angular/core';
import { ScheduleService } from 'src/app/shared/services/schedule.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { END_POINT } from 'src/app/shared/services/api-registry';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, DoCheck {
  matches = [];
  match = {};
  imgDefault = '../../../assets/images/default-image.png';
  showLoadingIndicator = true;
  latestResult: any;

  constructor(
    private scheduleService: ScheduleService,
    private elem: ElementRef,
    private auth: AuthService,
    private router: Router,
    private api: ApiService
  ) { }

  ngOnInit() {
    if (this.auth.currentUser && this.auth.currentUser.admin) {
      return this.router.navigate(['/admin'])
    }
    this.getLatestResultOfMatch();
    this.getMatches();
  }

  getLatestResultOfMatch(): any {
    this.api.get([END_POINT.home])
      .subscribe(matches => {
        if (matches) {
          this.latestResult = matches;
        } else {
          this.latestResult = [{id: 0}];
        }
      });
  }

  ngDoCheck() {
    let home_next_match = this.elem.nativeElement.querySelectorAll(".home-next-match");
    let home_schedule = this.elem.nativeElement.querySelectorAll('.home-schedule');
    if (home_next_match[0])
    home_next_match[0].style.height = home_schedule[0].offsetHeight + 'px';
  }

  getMatches(match_id?): void {
    this.scheduleService.getNextMatch()
      .subscribe(matches => {
        this.matches = matches;
        this.showLoadingIndicator = false;
      });
  }
}
