import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  errorNumber = 404;
  errorMessage = "Page not found";

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    let number = this.route.snapshot.paramMap.get('num');
    if (+number !== this.errorNumber) {
      this.errorNumber = +number;
      this.errorMessage = "Fobbiden"
    }
  }

}
