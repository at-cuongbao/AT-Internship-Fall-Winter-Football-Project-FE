import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

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
    private auth: AuthService) { }

  ngOnInit() {
  }

  signIn(credentials: any) {
    this.auth.login(credentials)
      .subscribe(result => {
        if (result) {
          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigate([returnUrl || '/']);
        } else {
          this.invalidLogin = true;
        }
      });
  }
}
