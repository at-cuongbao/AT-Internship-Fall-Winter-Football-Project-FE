import { Component, OnInit } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import {formatDate } from '@angular/common';
import { END_POINT } from './../../shared/services/api-registry';
import { map } from 'rxjs/operators';
import { ApiService } from './../../shared/services/api.service';

@Component({
  selector: 'app-guess',
  templateUrl: './guess.component.html',
  styleUrls: ['./guess.component.scss']
})
export class GuessComponent implements OnInit {
  imageSource = '../../../assets/images/avatar-image.jpg';
 
  constructor(
    private apiService: ApiService,
  ) {}

  ngOnInit() {
  }
  submit(f: NgForm) {
    const data = {
      date: new Date().getTime(), // epoch time
      match_id: '5c4050326559ab1da4fb58f0',
      user_id: '5c4050326559ab1da4fb58f0', 
      // user_id: localStorage.getItem('user_id'),
      scorePrediction: [f.value.firstGuess, f.value.secondGuess]
    };
    console.log();
    let url = [END_POINT.prediction+'/new']
    
    this.apiService.post(url, data).pipe(
      map(response => {
        if (response) {
          console.log(response);
          return true;
        }
        return false
      })
    ).subscribe(
      value => {console.log(value)}
    );
  }
}
