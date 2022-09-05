import { Component, OnInit } from '@angular/core';
import {ProductionPlantService} from '../production-plant.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  //"notStarted"|"Running"|"Stopped";
  state:0|1|2=0;
  stateButton:"Start"|"Stop"|"Reset"="Start";
  command={startRunning:false,stopRunning:false,reset:false};
  red="red";
  black="black";

  constructor(private ppserice:ProductionPlantService) { }

  ngOnInit(): void {
    if(this.ppserice.isRunning){
      this.state=1;
      this.stateButton="Stop";
      this.command={startRunning:false,stopRunning:false,reset:false};
    }
  }

  stateChange(){
    if(this.state==0){
      this.state=1;
      this.stateButton="Stop";
      this.command={startRunning:true,stopRunning:false,reset:false};
      this.ppserice.startTimer();
    }else if(this.state==1){
      this.state=2;
      this.command={startRunning:false,stopRunning:true,reset:false};
      this.ppserice.stopTimer();
      this.stateButton="Reset";
    }
    else{
      this.ppserice.reset();
      this.state=0;
      this.stateButton="Start";
    }
  }
}
