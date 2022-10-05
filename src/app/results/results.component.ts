import { Component, OnInit } from '@angular/core';
import {ProductionPlantService} from '../production-plant.service'

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  noChange = false;
  constructor(private ppserice:ProductionPlantService) { }

  ngOnInit(): void {
    if(this.NbProcessChange()==0){
      this.noChange=true;
    }
  }

  getLastWeek(){
    return this.ppserice.getLastweekChange();
  }

  getHistory(){
    return this.ppserice.history;
  }

  getInitCost(){
    return this.ppserice.initCost;
  }

  getTotalExps(){
    return this.ppserice.getTotalExperiments();
  }

  getMaxWeek(){
    return this.ppserice.MaxWeekCalac;
  }

  getTemp(){
    return this.ppserice.temperature;
  }

  getTime(){
    return this.ppserice.time;
  }

  getConc(){
    return this.ppserice.concentration;
  }

  getResp(){
    if(this.ppserice.week<this.ppserice.delayedWeek){
      return "Wait"
    }
    return this.ppserice.response;
  }

  getExtraProfit(){
    if(this.ppserice.week<this.ppserice.delayedWeek){
      return "";
    }
    return this.ppserice.getLastExtraProfit();
  }

  NbProcessChange(){
    return this.ppserice.history.length;
  }

  getTotalExpsCost(){
    return this.ppserice.getTotalExpCosts();
  }

  ProcessChangeCost(){
    return this.NbProcessChange()*this.ppserice.processChangeCost;
  }

  getTotExtraProf(){
    //CHenk calculation....
    //end week 40?
    let sum =0;
    for(let h of this.ppserice.history){
      sum+=h.extraprofit;
    }
    if(!this.noChange){
      const prof = this.getExtraProfit();
      if(prof!=""){
        sum+=prof;
      }
    }
    return sum;
  }

  
}
