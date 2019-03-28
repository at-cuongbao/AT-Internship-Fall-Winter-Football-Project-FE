import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { END_POINT } from 'src/app/shared/services/api-registry';
import { TournamentService } from 'src/app/shared/services/tournament.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  usersLength = 0;
  tournamentsLength = 0;
  tournaments = [];
  predictedMatchesLength = 0;
  showLoadingIndicator = true;
  message = '';

  constructor(private api: ApiService, private tournamentService: TournamentService) { }

  ngOnInit() {
    this.getAllUsers();
    this.getAllTournaments();
    this.getAllPredictedMatches();
  }

  getAllUsers() {
    this.api.get([END_POINT.users]).subscribe(users => {
      let _users = users.filter(user => user.is_admin !== true);
      this.usersLength = _users.length;
    })
  }

  getAllTournaments() {
    this.api.get([END_POINT.matches + '/showDonePercentMatches']).subscribe(tours => {
      if (tours) {
        tours.sort((a, b) => a.start_at < b.start_at ? 1 : -1);
        this.tournaments = tours;
        this.tournamentsLength = tours.length;
      } else {
        this.message = 'No tournaments!'
      }
      this.showLoadingIndicator = false;
    });
  }

  getAllPredictedMatches() {
    this.api.get([END_POINT.prediction]).subscribe(predictions => {
      this.predictedMatchesLength = predictions.length / 2;
    })
  }

  deleteTournament(_id) {
    if (confirm('Are you sure to delete?')) {
      this.api.delete([END_POINT.matches + '/' + _id]).subscribe(data => this.showLoadingIndicator = false);
      swal({
        text: 'You have register successfully !',
        icon: "success",
      });
      this.getAllTournaments();
    }
  }
}
