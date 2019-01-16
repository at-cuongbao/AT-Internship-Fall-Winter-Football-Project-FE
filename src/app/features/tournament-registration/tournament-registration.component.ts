import { Component, OnInit } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { END_POINT } from './../../shared/services/api-registry';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tournament-registration',
  templateUrl: './tournament-registration.component.html',
  styleUrls: ['./tournament-registration.component.scss']
})
export class TournamentRegistrationComponent implements OnInit {
  // chau event show component add team

  toggle = false;
  showAddTeam() {
    this.toggle = !this.toggle;
  }



  //

  name = '';
  number = '';
  a = [];
  email = '';
  phone = '';
  information = '';
  isShowForm = false;
  bang = ["A", "B", "C", "D", "E", "F", "H", "G"];

  constructor() { }

  ngOnInit() {

  }

  convert(number) {
    this.a = [];
    console.log(number.value);
    for (let i = 0; i < number.value; i++) {
      this.a.push(i);
    }
  }

  submit(f: NgForm) {
    // console.log(f.value)
    // let url = [END_POINT.teams]
    // this.registerTeamService.post(url  ,f.value).pipe(
    //   map(response => {
    //     if (response) {
    //       console.log(response);
    //       return true;
    //     }
    //     return false
    //   })
    // );
  }

}
