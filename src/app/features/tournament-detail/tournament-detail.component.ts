import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tournament-detail',
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.scss']
})
export class TournamentDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute) { }
  id = '';
  
  ngOnInit() {
   this.id = this.route.snapshot.params.id;
  }

}
