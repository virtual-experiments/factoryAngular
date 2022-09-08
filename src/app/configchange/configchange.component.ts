import { Component, OnInit } from '@angular/core';
import {ProductionPlantService} from '../production-plant.service';

@Component({
  selector: 'app-configchange',
  templateUrl: './configchange.component.html',
  styleUrls: ['./configchange.component.css']
})
export class ConfigchangeComponent implements OnInit {

  MinTemp = 60;
  MaxTemp = 140;
  MinTime =80;
  MaxTime = 160;
  MinConc = 0;
  MaxConc = 0.08; 
  Temp :number | null=null;
  Time :number | null=null;
  Conc :number | null=null;
  constructor(private ppserice:ProductionPlantService) { }

  ngOnInit(): void {
    this.Temp= this.ppserice.temperature;
    this.Time= this.ppserice.time;
    this.Conc = this.ppserice.concentration;
  }

  changeSetting(){
    if(this.Temp!=null && this.Time!=null && this.Conc!=null){
      this.ppserice.changeSetting({temp:this.Temp,time:this.Time,conc:this.Conc});
    }
  }
}
