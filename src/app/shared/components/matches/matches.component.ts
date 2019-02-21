import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {

  @Input() matches: any;
  @Output() openModal = new EventEmitter<any>();

  constructor(
    private auth: AuthService,
  ) { }

  ngOnInit() {
  }

  open(match: any) {
    this.openModal.emit(match);
  }
}
