import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guess',
  templateUrl: './guess.component.html',
  styleUrls: ['./guess.component.scss']
})
export class GuessComponent implements OnInit {
  imageSource = '../../../assets/images/avatar-image.jpg';
  constructor() { }

  ngOnInit() {
  }

}
