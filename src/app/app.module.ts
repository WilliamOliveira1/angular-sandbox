import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainThreeJsComponent } from './main-three-js/main-three-js.component';
import { GameLoungeComponent } from './game-lounge/game-lounge.component';

@NgModule({
  declarations: [
    AppComponent,
    MainThreeJsComponent,
    GameLoungeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
