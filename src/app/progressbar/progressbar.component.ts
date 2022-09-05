import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import {ProductionPlantService} from '../production-plant.service'

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.css']
})
export class ProgressbarComponent implements OnInit {

  percentage=0;
  week=0;
  subscription:Subscription | undefined;
  constructor(private ppserice:ProductionPlantService) { }

  ngOnInit(): void {
    this.subscription=this.ppserice.currentMessage.subscribe(message =>{
      if(message==3){
        this.percentage+=100/this.ppserice.MaxWeek;
        this.week+=1;
      }
    });
    this.week=this.ppserice.week;
    this.percentage = 100*this.week/this.ppserice.MaxWeek;
  }

  getWeek(){
    return this.ppserice.week/this.ppserice.MaxWeek;
  }

  ngOnDestroy():void{
    this.subscription?.unsubscribe();
    //console.log("destroyed pilot");
  }
}
