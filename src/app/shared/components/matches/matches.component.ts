import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit, OnChanges {

  @Input() matches: any;
  @Input() home = true;
  @Output() openModal = new EventEmitter<any>();

  constructor(
    private auth: AuthService,
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log(this.matches);
  }

  open(match: any) {
    this.openModal.emit(match);
  }
}
