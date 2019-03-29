import { Component, Input, OnChanges } from '@angular/core';
import { END_POINT } from '../../services/api-registry';
import { ApiService } from '../../services/api.service';
import { Match } from '../../models/match';

@Component({
  selector: 'app-latest-result',
  templateUrl: './latest-result.component.html',
  styleUrls: ['./latest-result.component.scss']
})
export class LatestResultComponent implements OnChanges {
  @Input() matches: Match[];
  users = [];
  latestResult: Match;
  
  constructor(private api: ApiService) { }

  ngOnChanges() {
    if (this.matches && this.matches.length) {
      this.latestResult = this.matches[0];
      this.getTopUser(this.matches[0].id);
    }
  }

  getTopUser(id) {
    this.api.get([END_POINT.prediction + '/top/' + id])
      .subscribe(data => {
        if (data) {
          this.users = data;
        }
      })
  }
}
