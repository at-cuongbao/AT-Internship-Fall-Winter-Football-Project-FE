import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  invalidRegister: boolean;

  constructor(
    private router: Router,
    private auth: AuthService) { }

  ngOnInit() {
  }

  register(credentials: any) {
    this.auth.register(credentials)
      .subscribe(result => {
        if (result) {
          this.router.navigate(['/']);
        } else {
          this.invalidRegister = true;
        }
      });
  }
}
