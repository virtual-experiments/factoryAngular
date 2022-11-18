import { Component, OnInit } from '@angular/core';
import { ProductionPlantService } from '../production-plant.service';

@Component({
  selector: 'app-time-config',
  templateUrl: './time-config.component.html',
  styleUrls: ['./time-config.component.css']
})
export class TimeConfigComponent implements OnInit {

  endWeek:number|null=null;
  weekDuration:number|null=null;
  MinEndWeek=20;
  MaxEndWeek=100;
  //in seconds
  MinWeekDuration=60;
  MaxWeekDuration=300;
  constructor(private ppserice:ProductionPlantService) { }

  ngOnInit(): void {
    this.endWeek =this.MinEndWeek;
    this.weekDuration = this.MinWeekDuration;
  }

  changeSetting(){
    if(!this.ppserice.started && this.endWeek!=null && this.weekDuration!=null){
      this.ppserice.setMaxWeek(this.endWeek); 
      this.ppserice.TimePerWeek=this.weekDuration*1000;
    }
  }
}
