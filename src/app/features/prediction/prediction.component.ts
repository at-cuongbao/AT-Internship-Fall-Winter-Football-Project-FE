import { Component, OnInit } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { END_POINT } from './../../shared/services/api-registry';
import { map } from 'rxjs/operators';
import { ApiService } from './../../shared/services/api.service';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.scss']
})
export class PredictionComponent implements OnInit {
  imageSource = '../../../assets/images/avatar-image.jpg';
 
  constructor(
    private apiService: ApiService,
  ) {}

  ngOnInit() {}

  submit(f: NgForm) {
    const data = {
      // epoch time
      date: new Date().getTime(),   
      match_id: '5c4050326559ab1da4fb58f0',
      user_id: '5c4050326559ab1da4fb58f0', 
      // user_id: localStorage.getItem('user_id'),
      scorePrediction: [f.value.firstPrediction, f.value.secondPrediction],
      tournament_team_id: ['5c4050326559ab1da4fb58f0', '5c4050326559ab1da4fb58f0']
    };
    let url = [END_POINT.prediction+'/new']
    
    this.apiService.post(url, data).pipe(
      map(response => {
        if (response) {
          return response ? true : false;
        }
      })
    ).subscribe(
      value => {value}
    );
  }
}
