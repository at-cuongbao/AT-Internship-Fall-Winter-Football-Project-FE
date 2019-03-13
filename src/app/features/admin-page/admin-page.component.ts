import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { END_POINT } from '../../shared/services/api-registry';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  CurrntMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",];

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
  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 900], label: 'Series B'}
  ];
  
  getStatistics() {
    this.api.get([END_POINT.statistics])
    .subscribe(
      res => {
        
        this.showGroupBars();
      }
    );
  }

  showGroupBars() {

  }
}
