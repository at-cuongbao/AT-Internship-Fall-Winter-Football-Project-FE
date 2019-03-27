import { Component, Input, OnChanges } from '@angular/core';
import { END_POINT } from '../../services/api-registry';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-latest-result',
  templateUrl: './latest-result.component.html',
  styleUrls: ['./latest-result.component.scss']
})
export class LatestResultComponent implements OnChanges {
  @Input() match: any;
  users = [];
  latestResult: any;
  
  constructor(private api: ApiService) { }

  ngOnChanges() {
    if (this.match) {
      this.latestResult = this.match[0];
      this.getTopUser(this.match[0].id);
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
