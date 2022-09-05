
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PilotComponent } from './pilot/pilot.component';
import { FactComponent } from './fact/fact.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { ExpadderComponent } from './expadder/expadder.component';
import { ConfigchangeComponent } from './configchange/configchange.component';
import { ResultsComponent } from './results/results.component';
import { MainComponent } from './main/main.component';
import { HistoryComponent } from './history/history.component';
import {MatMenuModule} from '@angular/material/menu'; 
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSliderModule} from '@angular/material/slider';

@NgModule({
  declarations: [
    AppComponent,
    PilotComponent,
    FactComponent,
    ProgressbarComponent,
    ExpadderComponent,
    ConfigchangeComponent,
    ResultsComponent,
    MainComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSliderModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
