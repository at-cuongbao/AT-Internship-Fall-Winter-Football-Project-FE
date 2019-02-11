import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isClick = false;

  images = [
    '../../../../assets/images/main-slider-img.jpg',
    '../../../../assets/images/main-slider-img1.jpg',
    '../../../../assets/images/main-slider-img2.jpg'
  ];

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  createResponsive() {
    this.isClick = !this.isClick;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
