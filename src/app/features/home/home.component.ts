import { Component, OnInit, ElementRef, DoCheck } from '@angular/core';
import { ScheduleService } from 'src/app/shared/services/schedule.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

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

  constructor(
    private scheduleService: ScheduleService,
    private elem: ElementRef,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.auth.currentUser && this.auth.currentUser.admin) {
      return this.router.navigate(['/admin'])
    }
    this.getMatches();
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
        this.matches.sort((a, b) => (a.start_at > b.start_at) ? 1 : -1);
        if (match_id) {
          matches.forEach(element => {
            if (element.id === match_id) {
              this.match = element;
              return;
            }
          });
        } else {
          this.match = matches[0];
        }
        this.showLoadingIndicator = false;
      });
  }

  getNextMatch(match: any) {
    this.match = match;
  }

}
