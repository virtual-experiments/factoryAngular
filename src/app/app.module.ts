
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
import {MatDialogModule} from '@angular/material/dialog';
import { AboutDialogComponent } from './about-dialog/about-dialog.component';
import { TimeConfigComponent } from './time-config/time-config.component';

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
    HistoryComponent,
    AboutDialogComponent,
    TimeConfigComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSliderModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
