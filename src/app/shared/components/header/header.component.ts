import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: []
})
export class HeaderComponent implements OnInit {
  isClick = false;

  images = [
    '../../../../assets/images/main-slider-img.jpg',
    '../../../../assets/images/main-slider-img1.jpg',
    '../../../../assets/images/main-slider-img2.jpg'
  ];

  // public config: ICarouselConfig = {
  //   verifyBeforeLoad: true,
  //   log: false,
  //   animation: true,
  //   animationType: AnimationConfig.SLIDE,
  //   autoplay: true,
  //   autoplayDelay: 2000,
  //   stopAutoplayMinWidth: 768
  // };

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  /* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
  createResponsive() {
    this.isClick = !this.isClick;
  }

  logout() {
    this.auth.logout();
  }
}
