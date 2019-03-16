import { Component, OnInit } from '@angular/core';
import { END_POINT } from 'src/app/shared/services/api-registry';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  CurrntMonth = ["March", "April", "May", "June"];

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.getStatistics();
  }
  
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: false
  };
  public barChartLabels = this.CurrntMonth;
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {
      data: [65, 59, 80, 81, 56, 55], label: 'Matches'
    }
  ];
  
  getStatistics() {
    this.api.get([END_POINT.statistics])
    .subscribe(
      res => {
        for(let i = 0; i < 2; i++) res.shift();
        this.barChartData = [
          {
            data: res, label: 'Matches'
          }
        ];
      }
    );
  }

}
