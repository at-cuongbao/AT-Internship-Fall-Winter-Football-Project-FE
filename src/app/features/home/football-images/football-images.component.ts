import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-football-images',
  templateUrl: './football-images.component.html',
  styleUrls: ['./football-images.component.scss']
})
export class FootballImagesComponent implements OnInit {
  imageSource = '../../../../assets/images/our-team-main-wrap.jpg';
  readTeam = false;

  constructor() { }

  ngOnInit() {
  }

  changeStatus(){
    this.readTeam= !this.readTeam;
  }
}
