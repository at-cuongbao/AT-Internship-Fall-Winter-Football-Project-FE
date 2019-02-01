import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { BracketComponent } from './features/bracket/bracket.component';
import { FeaturesComponent } from './features/features.component';
import { TournamentRegistrationComponent } from './features/tournament-registration/tournament-registration.component';
import { ScheduleComponent } from './features/schedule/schedule.component';
import { RegisterComponent } from 'src/app/features/register/register.component';
import { PredictionComponent } from 'src/app/features/prediction/prediction.component';

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
        path: 'prediction/:id',
        component: PredictionComponent
      },
      {
        path: 'schedules',
        component: ScheduleComponent
      },
      {
        path: 'bracket',
        component: BracketComponent
      },
      // {
      //   path: '**',
      //   redirectTo: '404'
      // }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
