import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-football-images',
  templateUrl: './football-images.component.html',
  styleUrls: ['./football-images.component.scss']
})
export class FootballImagesComponent implements OnInit {
  imageSource = '../../../../assets/images/our-team-main-wrap.jpg';
  imageSource1 = '../../../../assets/images/neymar.png';
  imageSource2 = '../../../../assets/images/ronaldo.png';
  imageSource3 = '../../../../assets/images/messi.png';
  imageSource4 = '../../../../assets/images/ibra.jpg';
  
  readTeam = false;
  readMore = ['Read More']; 
  flag = true;

  constructor() { }

  ngOnInit() {
  }

  changeStatus(){
    this.flag = !this.flag;
    this.readTeam = !this.readTeam;
    if (this.flag) {
      this.readMore = ['Read More']; 
    } else {
      this.readMore = ['Close'];
    }
  }
  
}
