import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { FeaturesComponent } from './features/features.component';
import { TournamentRegistrationComponent } from './features/tournament-registration/tournament-registration.component';
import { ScheduleComponent } from './features/schedule/schedule.component';
import { RegisterComponent } from 'src/app/features/register/register.component';
import { PredictionComponent } from 'src/app/features/prediction/prediction.component';
import { BracketComponent } from 'src/app/features/bracket/bracket.component';
import { HomeComponent } from './features/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: FeaturesComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'tounament-registration',
        component: TournamentRegistrationComponent
      },
      {
        path: 'prediction/:id',
        component: PredictionComponent
      },
      {
        path: 'schedules/:id',
        component: ScheduleComponent
      },
      {
        path: 'bracket',
        component: BracketComponent
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
