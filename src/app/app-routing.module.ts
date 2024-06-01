import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MainThreeJsComponent } from './main-three-js/main-three-js.component';
import { GameLoungeComponent } from './game-lounge/game-lounge.component';

const routes: Routes = [
  { path: '', component: GameLoungeComponent },
  { path: 'ThreeJs', component: MainThreeJsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
