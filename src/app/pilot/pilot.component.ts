import { Component, OnInit,OnDestroy,AfterViewInit, Input,OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
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
  tnklvlbarbeginw = 0;
  tnklvlbarbeginh = 0;
  tnklvlbarwidth = 0;
  tnklvlbarheight = 0;

  @ViewChild("plimg") pilotimg!:ElementRef;

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

      const lvl = (this.ExperimentService.tankCapacity-message.runnrTank)/this.ExperimentService.tankCapacity;
      const used = message.runnrTank/this.ExperimentService.tankCapacity;
      let ctx=this.pilotimg.nativeElement.getContext("2d");
      ctx.clearRect(this.tnklvlbarbeginw,this.tnklvlbarbeginh,this.tnklvlbarwidth,this.tnklvlbarheight);
      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.rect(this.tnklvlbarbeginw,this.tnklvlbarbeginh+this.tnklvlbarheight*used,this.tnklvlbarwidth,this.tnklvlbarheight*lvl);
      ctx.fill();
    });
    
  }

  ngAfterViewInit():void{
    this.pilotImageInit();
  }
 

  pilotImageInit(){
    let ctx=this.pilotimg.nativeElement.getContext("2d");
    const centerX = this.pilotimg.nativeElement.width / 2;
    const h = this.pilotimg.nativeElement.height;
    const padding = 0.05;
    const hpad = h*padding/2;
    const wpad = centerX*padding;
    const ellipseh = 1/10;
    const tankColor = "gray";
    const distance = centerX*2/6;
    const boilerh = h/4;
    const boilerw = centerX*2/3;
    const tanklvlw =centerX/3;
    const grounddist = h/5; 
    const tanklvlh = h/3;
    const tnklvlbarpadw = centerX/30;
    const tnklvlbarw = centerX*8/30;
    const tnklvlbarpadh = h/30;
    const tnklvlbarh = h*8/30;


    ctx.fillStyle ="black";
    ctx.beginPath();
    ctx.rect(wpad,h/2-grounddist,centerX,h/2);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(centerX/2+wpad, h-grounddist, centerX/2, h*ellipseh, 0, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.fillStyle = tankColor;
    ctx.fillRect(wpad,h/2-grounddist,centerX,h/2);
    ctx.beginPath();
    ctx.ellipse(centerX/2+wpad, h-grounddist, centerX/2, h*ellipseh, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle ="black";
    ctx.beginPath();
    ctx.ellipse(centerX/2+wpad, h/2-grounddist, centerX/2, h*ellipseh, 0, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = tankColor;
    ctx.beginPath();
    ctx.ellipse(centerX/2+wpad, h-grounddist, centerX/2, h*ellipseh, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(centerX/2+wpad, h/2-grounddist, centerX/2, h*ellipseh, 0, 0, 2 * Math.PI);
    ctx.fill();

    /**const begin = distance+centerX;
    ctx.fillStyle ="black";
    ctx.beginPath();
    ctx.rect(begin,h-boilerh-grounddist,boilerw,boilerh);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(begin+boilerw/2, h-grounddist, boilerw/2, h*ellipseh, 0, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.fillStyle = tankColor;
    ctx.fillRect(begin,h-boilerh-grounddist,boilerw,boilerh);
    ctx.beginPath();
    ctx.ellipse(begin+boilerw/2, h-grounddist, boilerw/2, h*ellipseh, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle ="black";
    ctx.beginPath();
    ctx.ellipse(begin+boilerw/2, h-boilerh-grounddist, boilerw/2, h*ellipseh, 0, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = tankColor;
    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.ellipse(begin+boilerw/2, h-boilerh-grounddist, boilerw/2, h*ellipseh, 0, 0, 2 * Math.PI);
    ctx.fill();**/

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.rect(tanklvlw+wpad/2,h-tanklvlh-grounddist,tanklvlw,tanklvlh);
    ctx.fill();

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.rect(tanklvlw+wpad/2+tnklvlbarpadw,h-tanklvlh-grounddist+tnklvlbarpadh,tnklvlbarw,tnklvlbarh);
    ctx.fill();
    this.tnklvlbarbeginw=tanklvlw+wpad/2+tnklvlbarpadw;
    this.tnklvlbarbeginh = h-tanklvlh-grounddist+tnklvlbarpadh;
    this.tnklvlbarwidth = tnklvlbarw;
    this.tnklvlbarheight = tnklvlbarh;

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
  

  ngOnDestroy():void{
    this.subscription?.unsubscribe();
    console.log("destroyed pilot");
  }



}
