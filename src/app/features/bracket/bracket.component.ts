import { MatchService } from 'src/app/shared/services/match.service';
import { ActivatedRoute } from '@angular/router';
import { Output, EventEmitter, OnInit, Component, Input } from '@angular/core';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss']
})
export class BracketComponent implements OnInit {
  tournamentName: string;
  _src = "../../../assets/images/tr.png";
  @Input() bracketView = [];

  constructor() { }

  ngOnInit() {
  }

}
