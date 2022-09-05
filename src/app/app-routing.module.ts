import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigchangeComponent } from './configchange/configchange.component';
import { ExpadderComponent } from './expadder/expadder.component';
import { HistoryComponent } from './history/history.component';
import { MainComponent } from './main/main.component';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'expadder', component: ExpadderComponent },
  { path: 'configchange', component: ConfigchangeComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'history', component: HistoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
