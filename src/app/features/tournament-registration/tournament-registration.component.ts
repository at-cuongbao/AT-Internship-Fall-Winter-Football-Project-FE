import { Component, OnInit, Inject } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { Team } from 'src/app/shared/models/team';

@Component({
  selector: 'app-tournament-registration',
  templateUrl: './tournament-registration.component.html',
  styleUrls: ['./tournament-registration.component.scss']
})
export class TournamentRegistrationComponent implements OnInit {
  imageSource = '../../../assets/images/anhbongda.jpg';
  teams: Team[] = [];
  imageLogo = [];
  name = '';
  number = '';
  result = [];
  email = '';
  phone = '';
  information = '';
  isShowForm = false;
  table = ["A", "B", "C", "D", "E", "F", "H", "G"];

  constructor() { }

  ngOnInit() {}
  
  convert(number) {
    this.result = [];
    for (let i = 0; i < number.value; i++) {
      this.result.push(i);
    }
  }
  submit(f: NgForm) {}
}
