import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-next-match',
  templateUrl: './next-match.component.html',
  styleUrls: ['./next-match.component.scss']
})
export class NextMatchComponent implements OnInit {

  @Input("data") match = [];

  constructor() { }

  ngOnInit() {
  }

}
