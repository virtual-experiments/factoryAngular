import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ProductionPlantService {
  temperature:number=99;
  time:number=143;
  concentration:number=0.015;
  response =0;
  newSettingDelay=6;
  delayedWeek=0;
  week=0;
  MaxWeek=40;
  //in milliseconds
  TimePerWeek = 10000;
  timer:any;
  private messageSource = new BehaviorSubject(0);
  currentMessage = this.messageSource.asObservable();
  constructor() {
    this.timer= setInterval((that:ProductionPlantService)=>{
      if(that.week<that.MaxWeek){
        that.increaseWeek();
      }
    },this.TimePerWeek,this);
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
