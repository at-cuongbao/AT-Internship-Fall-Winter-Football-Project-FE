import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faSignInAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faGooglePlus } from '@fortawesome/free-brands-svg-icons';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerComponent } from './shared/components/banner/banner.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    FooterComponent,
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor() {
    // Add an icon to the library for convenient access in other components.
    library.add(faSearch, faSignInAlt, faEnvelope, faFacebook, faTwitter, faGooglePlus);
  }
}
