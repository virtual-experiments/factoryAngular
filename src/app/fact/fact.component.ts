import { Component, OnInit,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {ProductionPlantService} from '../production-plant.service'

@Component({
  selector: 'app-fact',
  templateUrl: './fact.component.html',
  styleUrls: ['./fact.component.css']
})
export class FactComponent implements OnInit {

  subscription:Subscription | undefined;
  delayPeriod=false;
  constructor(private ppserice:ProductionPlantService) { }

  ngOnInit(): void {
    this.subscription=this.ppserice.currentMessage.subscribe(message =>{
      if(message==1){
        this.delayPeriod=true;
      }
      else if(message==2){
        this.delayPeriod=false;
      }
    });
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
    if(this.delayPeriod){
      return "";
    }
    return this.ppserice.response;
   }

   getDelayWeek(){
    return this.ppserice.delayedWeek;
   }

   ngOnDestroy():void{
    this.subscription?.unsubscribe();
    //console.log("destroyed fact");
  }
}
