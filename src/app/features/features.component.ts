import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {
  imageSource = '../../../assets/images/head-bg.jpg';
  pageName: string = '';
  
  constructor(private router: Router) {}

  ngOnInit() {
    this.pageName = this.router.url.replace('/', '').replace('-', ' ');
    let index = this.pageName.search('/');
    if (index !== -1) {
      this.pageName = this.pageName.slice(0, index);
    }
  }

}
