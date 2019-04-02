import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { TransportService } from '../shared/services/transport.service';
import { ApiService } from '../shared/services/api.service';
import { END_POINT } from '../shared/services/api-registry';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {
  tournamentName = '';
  tournamentId = '';
  pageName = '';
  imageSource = '../../../assets/images/head-bg.jpg';

  constructor(
    private router: Router,
    private grab: TransportService,
    private api: ApiService,
  ) {
    this.getUrl();
  }
  
  ngOnInit() {
  }

  getUrl() {
    this.router.events.subscribe((event) => {
      
      if (event instanceof NavigationEnd) {
        this.pageName = event.url;
        this.pageName = this.pageName.replace('/', '').replace('-', ' ');
      }
      let index = this.pageName.search('/');
      if (index !== -1) {
        this.tournamentId = this.pageName.slice(index + 1);
        this.pageName = this.pageName.slice(0, index);
        if (this.tournamentId && this.pageName == 'schedules') {
          this.api.get([END_POINT.tournaments, this.tournamentId]).subscribe(
            data => {
              this.tournamentName = data[0].name;
            }
          )
        }
      } else {
        this.tournamentName = '';
      }
    })
  }
}
