import { Component } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {
  imageSources = [
    '../../../../assets/images/messi-bg.jpg',
    '../../../../assets/images/ronaldo-bg.jpg',
    '../../../../assets/images/torres-bg.jpg'
  ];

  constructor() {}
}
