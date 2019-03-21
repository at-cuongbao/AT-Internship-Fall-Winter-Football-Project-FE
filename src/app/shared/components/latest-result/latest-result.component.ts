import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { matchesElement } from '@angular/animations/browser/src/render/shared';

@Component({
  selector: 'app-latest-result',
  templateUrl: './latest-result.component.html',
  styleUrls: ['./latest-result.component.scss']
})
export class LatestResultComponent implements OnInit, OnChanges {

  @Input() match: any;
  latestResult: any;
  constructor() { }

  ngOnChanges() {
    if (this.match) {
      this.latestResult = this.match[0];
    }
  }

  ngOnInit() {
    
  }

}
