import { Component } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {
  imageSources = [
    '../../../../assets/images/main-slider-img.jpg',
    '../../../../assets/images/main-slider-img1.jpg',
    '../../../../assets/images/main-slider-img2.jpg'
  ];

  constructor() {}
}
