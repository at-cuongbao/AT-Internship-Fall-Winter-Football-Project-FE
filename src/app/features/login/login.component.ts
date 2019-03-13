import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private spinner: NgxSpinnerService,
    private jwtHelperService: JwtHelperService
  ) { }

  ngOnInit() {
  }
  
  signIn(credentials: any) {
    this.spinner.show();
    this.auth.login(credentials)
      .subscribe(result => {
        if (result && result.flag) {
          let token = this.jwtHelperService.decodeToken(result.response);
          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          if (token.admin) {
            returnUrl = '/admin';
          }
          this.router.navigate([returnUrl || '/']);
        } else {
          this.invalidLogin = true;
        }
        this.spinner.hide();
      });
  }
}
