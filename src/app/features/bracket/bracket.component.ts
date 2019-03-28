import { OnInit, Component, Input } from '@angular/core';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss']
})
export class BracketComponent implements OnInit {
  tournamentName: string;
  imageSource = "../../../assets/images/tr.png";
  @Input() bracketView = [];
  @Input() winner = {};

  constructor() { }

  ngOnInit() {
  }

}
