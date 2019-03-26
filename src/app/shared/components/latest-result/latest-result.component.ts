import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { matchesElement } from '@angular/animations/browser/src/render/shared';
import { END_POINT } from '../../services/api-registry';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-latest-result',
  templateUrl: './latest-result.component.html',
  styleUrls: ['./latest-result.component.scss']
})
export class LatestResultComponent implements OnInit, OnChanges {
  users = [];
  @Input() match: any;
  latestResult: any;
  
  constructor(private api: ApiService) { }

  ngOnChanges() {
    if (this.match) {
      this.latestResult = this.match[0];
      this.getTopUser(this.match[0].id);
    }
  }

  ngOnInit() {
  }

  getTopUser(id) {
    this.api.get([END_POINT.prediction + '/top/' + id])
      .subscribe(data => {
        if (data) {
          console.log(data);
          this.users = data;
        }
      })
  }
}
