import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
  
@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.scss']
})
export class MatchDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  id = '';
  
  ngOnInit() {
   this.id = this.route.snapshot.params.id;
  }


}
