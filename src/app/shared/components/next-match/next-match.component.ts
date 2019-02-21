import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-next-match',
  templateUrl: './next-match.component.html',
  styleUrls: ['./next-match.component.scss']
})
export class NextMatchComponent implements OnInit, OnChanges {

  @Input("match") match = {};

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
  }
}
