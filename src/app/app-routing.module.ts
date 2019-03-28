import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { FeaturesComponent } from './features/features.component';
import { TournamentRegistrationComponent } from './features/tournament-registration/tournament-registration.component';
import { ScheduleComponent } from './features/schedule/schedule.component';
import { RegisterComponent } from 'src/app/features/register/register.component';
import { BracketComponent } from 'src/app/features/bracket/bracket.component';
import { HomeComponent } from './features/home/home.component';
import { PageNotFoundComponent } from '../app/shared/components/page-not-found/page-not-found.component';
import { TournamentListComponent } from 'src/app/features/tournament-list/tournament-list.component';
import { AuthGuardService } from 'src/app/shared/services/auth-guard.service';
import { AdminAuthGuardService } from 'src/app/shared/services/admin-auth-guard.service';
import { TournamentDetailComponent } from './features/tournament-detail/tournament-detail.component';
import { MatchDetailComponent } from './features/match-detail/match-detail.component';
import { TeamDetailComponent } from './features/team-detail/team-detail.component';
import { AllSchedulesComponent } from './features/all-schedules/all-schedules.component';
import { PredictionListComponent } from './features/prediction-list/prediction-list.component';
import { AdminPageComponent } from './features/admin-page/admin-page.component';
import { AdminHomeComponent } from './features/admin-page/admin-home/admin-home.component';
import { CurrentDateScheduleComponent } from './features/current-date-schedule/current-date-schedule.component';
import { FootballResultsComponent } from './features/football-results/football-results.component';
import { TournamentResultsComponent } from './features/tournament-results/tournament-results.component';
// import { CurrentDateScheduleComponent } from './features/current-date-schedule/current-date-schedule.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    component: FeaturesComponent,
    children: [
      {
        path: 'tables',
        component: TournamentListComponent
      },
      {
        path: 'schedules/:id',
        component: ScheduleComponent,
      },
      {
        path: 'bracket/:id',
        component: BracketComponent
      },
      {
        path: 'tournament-results/:id',
        component: TournamentResultsComponent
      },
      {
        path: 'football-results',
        component: FootballResultsComponent
      },
      // {
      //   path: 'current-date-schedule',
      //   component: CurrentDateScheduleComponent
      // },
      {
        path: 'prediction-list',
        component: PredictionListComponent
      }
    ]
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    children: [
      {
        path: '',
        component: AdminHomeComponent,
        canActivate: [ AuthGuardService, AdminAuthGuardService]
      },
      {
        path: 'tournament-registration', 
        component: TournamentRegistrationComponent,
        canActivate: [ AuthGuardService, AdminAuthGuardService ]
      },
      {
        path: 'tournaments',
        component: TournamentListComponent
      },
      {
        path: 'schedules/:id',
        component: ScheduleComponent,
      },
      {
        path: 'bracket/:id',
        component: BracketComponent
      },
      {
        path: 'all-schedules',
        component: AllSchedulesComponent
      },
      {
        path: 'prediction-list',
        component: PredictionListComponent
      }
    ],
    canActivate: [ AuthGuardService, AdminAuthGuardService]
  },
  {
    path: 'tables/:id',
    component: TournamentDetailComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'error/:num',
    component: PageNotFoundComponent
  },
  {
    path: 'match-detail/:id',
    component: MatchDetailComponent
  },
  {
    path: 'team-detail/:id',
    component: TeamDetailComponent
  },
  {
    path: '**',
    redirectTo: '/error/404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
