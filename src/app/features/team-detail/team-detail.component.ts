import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { END_POINT } from 'src/app/shared/services/api-registry';
import { Team } from 'src/app/shared/models/team';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {
  team: Team = {
    name: '?',
    code: '?',
    cover: '../../../assets/images/logo-img.png',
    logo: '../../../assets/images/logo-img.png'
  };

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.getTeam();
  }

  getTeam() {
    let id = this.route.snapshot.params.id || '5c6f9cc095912c19cc65fd38';
    this.api.get([END_POINT.teams + '/' + id])
      .subscribe(data => {
        if (data != 404) {
          this.team = data
          
        }
      }
      );
   
    
  }
}
