import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MainThreeJsComponent } from './main-three-js/main-three-js.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'ThreeJs', component: MainThreeJsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
