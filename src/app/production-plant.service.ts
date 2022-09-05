import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import {ExperimentsService} from './experiments.service';

@Injectable({
  providedIn: 'root'
})
export class ProductionPlantService {
  temperature:number=99;
  time:number=143;
  concentration:number=0.015;
  response =4537.8;
  newSettingDelay=6;
  delayedWeek=0;
  week=0;
  MaxWeek=40;
  //in milliseconds
  TimePerWeek = 10000;
  timer:any;
  isRunning =false;
  private messageSource = new BehaviorSubject(0);
  currentMessage = this.messageSource.asObservable();
  constructor(private ExperimentService:ExperimentsService) {
    
   }

  startTimer(){
    this.isRunning=true;
    this.timer= setInterval((that:ProductionPlantService)=>{
      if(that.week<that.MaxWeek){
        that.increaseWeek();
      }
    },this.TimePerWeek,this);
  }

  stopTimer(){
    this.isRunning=false;
    clearInterval(this.timer);
  }

  reset(){
    //console.log("ppservice reset");
    this.temperature=99;
    this.time=143;
    this.concentration=0.015;
    this.response =4537.8;
    this.week=0;
    this.delayedWeek=0;
    this.messageSource.next(0);
    this.ExperimentService.reset();
  }

  changeSetting(setting:{temp:number,time:number,conc:number}){
    //TO DO: CALCULATE RESPONSE...
    this.temperature=setting.temp;
    this.time=setting.time;
    this.concentration=setting.conc;
    this.delayedWeek= this.week+this.newSettingDelay;
    this.messageSource.next(1);
  }

  increaseWeek(){
    if(this.week==this.delayedWeek){
      this.messageSource.next(2);
    }
    this.week+=1;
    this.messageSource.next(3);
  }
}
