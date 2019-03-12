import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationStart } from '@angular/router';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent {
  imageSource = '../../../assets/images/head-bg.jpg';
  pageName: string = '';
  
  constructor(private router: Router) {
    this.getUrl();
  }

  getUrl() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.pageName =  event.url;
        this.pageName = this.pageName.replace('/', '').replace('-', ' ');
      }
      let index = this.pageName.search('/');
      if (index !== -1) {
        this.pageName = this.pageName.slice(0, index);
      }
    })
  }
}
