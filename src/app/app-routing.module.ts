import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { BracketComponent } from './features/bracket/bracket.component';
import { FeaturesComponent } from './features/features.component';
import { TournamentRegistrationComponent } from './features/tournament-registration/tournament-registration.component';
import { TeamRegistrationComponent } from './features/team-registration/team-registration.component';
import { ScheduleComponent } from './features/schedule/schedule.component';

const routes: Routes = [
  {
    path: '',
    component: FeaturesComponent,
    children: [
      {
        path: 'tounament-registration',
        component: TournamentRegistrationComponent
      },
      {
        path: 'tounament-registration/team-registration',
        component: TeamRegistrationComponent
      },
      {
        path: 'schedules',
        component: ScheduleComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'bracket',
    component: BracketComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
