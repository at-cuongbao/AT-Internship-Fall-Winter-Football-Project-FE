import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { SlideshowModule } from 'ng-simple-slideshow';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppComponent } from './app.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { HomeComponent } from '../app/features/home/home.component';
import { LoginComponent } from '../app/features/login/login.component';
import { BracketComponent } from './features/bracket/bracket.component';
import { FeaturesComponent } from './features/features.component';
import { TournamentRegistrationComponent } from './features/tournament-registration/tournament-registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SliderComponent } from './shared/components/slider/slider.component';
import { RegisterComponent } from './features/register/register.component';
import { ScheduleComponent } from './features/schedule/schedule.component';
import { PageNotFoundComponent } from '../app/shared/components/page-not-found/page-not-found.component';
import { QuestionMaskPipe } from './shared/pipes/question-mask.pipe';
import { DateDefaultPipe } from './shared/pipes/date-default.pipe';
import { TournamentListComponent } from './features/tournament-list/tournament-list.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { FootballImagesComponent } from './features/home/football-images/football-images.component';
import { LatestResultComponent } from './shared/components/latest-result/latest-result.component';
import { MatchesComponent } from './shared/components/matches/matches.component';
import { NextMatchComponent } from './shared/components/next-match/next-match.component';
import { TournamentDetailComponent } from './features/tournament-detail/tournament-detail.component';
import { MatchDetailComponent } from './features/match-detail/match-detail.component';
import { TeamDetailComponent } from './features/team-detail/team-detail.component';
import { AllSchedulesComponent } from './features/all-schedules/all-schedules.component';
import { DialogEditMatchComponent } from './shared/components/dialog/dialog-edit-match/dialog-edit-match.component';
import { PredictionListComponent } from './features/prediction-list/prediction-list.component';
import { AdminPageComponent } from './features/admin-page/admin-page.component';
import { DialogAddTeamComponent } from './shared/components/dialog/dialog-add-team/dialog-add-team.component';
import { ChartsModule } from 'ng2-charts';
import { StatisticsComponent } from './features/admin-page/statistics/statistics.component';
import { AdminHomeComponent } from './features/admin-page/admin-home/admin-home.component';
import { CountdownTimerComponent } from './shared/components/countdown-timer/countdown-timer.component';
import { SelectWinnerTableComponent } from './shared/components/dialog/select-winner-table/select-winner-table.component';
// import { CurrentDateScheduleComponent } from './features/current-date-schedule/current-date-schedule.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    BracketComponent,
    FeaturesComponent,
    TournamentRegistrationComponent,
    ScheduleComponent,
    SliderComponent,
    RegisterComponent,
    PageNotFoundComponent, 
    QuestionMaskPipe, 
    DateDefaultPipe, 
    TournamentListComponent, 
    SidebarComponent,
    PageNotFoundComponent, 
    QuestionMaskPipe, 
    DateDefaultPipe, 
    TournamentDetailComponent,
    FootballImagesComponent, 
    LatestResultComponent,
    MatchesComponent,
    NextMatchComponent,
    MatchDetailComponent,
    TeamDetailComponent,
    AllSchedulesComponent,
    DialogEditMatchComponent,
    PredictionListComponent,
    AdminPageComponent,
    DialogAddTeamComponent,
    StatisticsComponent,
    AdminHomeComponent,
    CountdownTimerComponent,
    SelectWinnerTableComponent,
    // CurrentDateScheduleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        // whitelistedDomains: ['http://172.18.19.83:3000'],
        // blacklistedRoutes: ['http://172.18.19.83:3000/api/authenticate']
        whitelistedDomains: ['http://localhost:3000'],
        blacklistedRoutes: ['http://localhost:3000/api/authenticate']
      }
    }),
    BrowserAnimationsModule,
    SlideshowModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ChartsModule,
    NgxSpinnerModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
