import { Component, OnInit,OnDestroy,AfterViewInit, Input,OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import {ExperimentsService} from '../experiments.service';

@Component({
  selector: 'app-pilot',
  templateUrl: './pilot.component.html',
  styleUrls: ['./pilot.component.css']
})
export class PilotComponent implements OnInit {
  
  @Input() state:any;

  RunNr=0;
  RunNrSameTank=0;
  TankNr=0;
  Temperature=0;
  Time=0;
  Concentration=0;
  Response=0;

  experimentRunning =false;
  subscription:Subscription | undefined;
  constructor(private ExperimentService:ExperimentsService) { }

  ngOnInit(): void {
    this.subscription= this.ExperimentService.currentMessage.subscribe(message =>{
      //console.log("message receiveded pilot");
      if(message==this.ExperimentService.default){
        this.experimentRunning=false;
        const l =this.ExperimentService.performedExps.length;
        if(l!=0){
          message= this.ExperimentService.performedExps[l-1];
        }
      }
      else{
        this.experimentRunning=true;
        console.log("plot experiment received");
      }
      this.RunNr=message.runnr;
      this.RunNrSameTank=message.runnrTank;
      this.TankNr=message.tanknr;
      this.Temperature=message.temp;
      this.Time=message.time;
      this.Concentration=message.conc;
      this.Response=message.response;
    });
  }

  //What should happen if stop button should stop the experiments????
  /**showExps(message:any){
      const timeinterval = 2000;
      this.experimentRunning=true;
      let i =0;
      //console.log("showExps pilot");
      while(i<message.length){
        setTimeout((that:PilotComponent,message:any,i:number)=>{
          that.RunNr=message[i].runnr;
          that.RunNrSameTank=message[i].runnrTank;
          that.TankNr=message[i].tanknr;
          that.Temperature=message[i].temp;
          that.Time=message[i].time;
          that.Concentration=message[i].conc;
          that.Response=message[i].response;
          if(i==message.length-1){
            that.experimentRunning=false;
          }
        },
        timeinterval*(i+1),this,message,i);

        i+=1;
      }
  }**/
  ngAfterViewInit():void{
  
  }

  ngOnDestroy():void{
    this.subscription?.unsubscribe();
    console.log("destroyed pilot");
  }



}
