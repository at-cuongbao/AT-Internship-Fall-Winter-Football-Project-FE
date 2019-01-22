import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  providers: [NgbCarouselConfig]
})
export class BannerComponent implements OnInit {
  images = [
    '../../../../assets/images/main-slider-img.jpg',
    '../../../../assets/images/main-slider-img1.jpg',
    '../../../../assets/images/main-slider-img2.jpg'
  ];

  constructor() { }

  ngOnInit() {
  }

}
