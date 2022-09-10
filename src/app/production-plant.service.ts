import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import {ExperimentsService} from './experiments.service';

@Injectable({
  providedIn: 'root'
})
export class ProductionPlantService {

  history : {temp:number,time:number,conc:number,endweek:number,beginweek:number,resp:number,extraprofit:number}[]=[];
  temperature:number=99;
  time:number=143;
  concentration:number=0.015;
  InitResp = 4537.8;
  response =this.InitResp;
  newSettingDelay=6;
  delayedWeek=0;
  week=0;
  MaxWeek=90;
  //in milliseconds
  TimePerWeek = 10000;
  timer:any;
  isRunning =false;
  started =false;
  private messageSource = new BehaviorSubject(0);
  currentMessage = this.messageSource.asObservable();
  initCost= 6806.7;
  processChangeCost = 2722.68;
  constructor(private ExperimentService:ExperimentsService) {
    
   }

  startTimer(){
    this.isRunning=true;
    this.started=true;
    this.timer= setInterval((that:ProductionPlantService)=>{
      if(that.week<that.MaxWeek){
        that.increaseWeek();
      }
    },this.TimePerWeek,this);
  }

  stopTimer(){
    this.isRunning=false;
    clearInterval(this.timer);
    this.ExperimentService.stopRunningExps();
  }


  changeSetting(setting:{temp:number,time:number,conc:number}){
    //TO DO: CALCULATE RESPONSE...
    if(this.week<this.MaxWeek){
      const l = this.history.length;
      let beginweek = 1;
      if(l>0){
        beginweek = this.history[l-1].endweek+1;
      }
      //TO DO : CLACULATE THIS
      const extrapr= this.Profit(beginweek,this.week,this.response);
      this.history.push({temp:this.temperature,time:this.time,conc:this.concentration,endweek:this.week,beginweek:beginweek,resp:this.response,extraprofit:extrapr});
      
      this.temperature=setting.temp;
      this.time=setting.time;
      this.concentration=setting.conc;
      this.response = this.Response(setting.temp,setting.time,setting.conc);
      this.delayedWeek= this.week+this.newSettingDelay;
      this.messageSource.next(1);
    }
  }

  increaseWeek(){
    if(this.week==this.delayedWeek){
      this.messageSource.next(2);
    }
    this.week+=1;
    this.messageSource.next(3);
  }

  getLastweekChange(){
    const l = this.history.length;
    if(l>0){
      return this.history[l-1].endweek +1;
    }
    return 1;
  }

  getTotalExperiments(){
    return this.ExperimentService.getRunnr();
  }

  getTotalExpCosts(){
    //TO DO CALCULATE
    return this.ExperimentService.getRunnr()*this.ExperimentService.experimentCost;
  }

  Response(temp:number,  time:number, conc:number) {
    let xtemp = (temp - 60.0) / 80.0;
    let ytime = (time - 80.0) / 80.0;
    let zconc = conc / 0.08;
    xtemp = 1.0 - xtemp;
    ytime = 1.0 - ytime;
    zconc = 1.0 - zconc;
    let resp = 0.0;
    let resp2 = -40.0 * xtemp * xtemp + 16.0 * xtemp - 14.4 * ytime * ytime - 9.6 * ytime + 10.0 + 48.0 * xtemp * ytime + 10.0 / ((xtemp + 1.0) * (2.0 - ytime));
    if (resp2 > 0.0) {
        resp += resp2;
    }
    let resp3 = -325.0 * xtemp * xtemp * xtemp + 310.0 * xtemp * xtemp - 48.0 * xtemp - 58.0 * zconc * zconc * zconc + 145.0 * zconc * zconc - 78.0 * zconc + 32.0 + (260.0 * xtemp - 177.0 * zconc - 22.0) * xtemp * zconc;
    if (resp3 > 0.0) {
        resp += resp3;
    }
    resp = resp * 0.21045247281655557 * 1.0178117048346056;
    resp *= 1000.0;
    let euroResp = resp * 0.453780216;
    let rest = Math.floor(euroResp * 1000.0) - Math.floor(euroResp * 100.0) * 10;
    if (rest < 5) {
        euroResp = Math.floor(euroResp * 100.0) / 100.0;
    }
    else if (rest >= 5) {
        euroResp = (Math.floor(euroResp * 100.0) + 1.0) / 100.0;
    }
    return euroResp;
}

Profit(beginChangeTime:number, endChangeTime:number, resp:number) {
  let prof = (endChangeTime - beginChangeTime) * (resp - this.InitResp);
  let rest = Math.floor(prof * 1000.0) - Math.floor(prof * 100.0) * 10;
  if (rest < 5) {
      prof = Math.floor(prof * 100.0) / 100.0;
  }
  else {
      prof = (Math.floor(prof * 100.0) + 1.0) / 100.0;
  }
  return prof;
}


  getLastExtraProfit(){
    return this.Profit(this.getLastweekChange(),this.MaxWeek,this.response);
  }
}
