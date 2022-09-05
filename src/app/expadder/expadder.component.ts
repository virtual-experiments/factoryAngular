import { Component, ElementRef, OnInit, ViewChild ,AfterViewInit} from '@angular/core';
import {ExperimentsService} from '../experiments.service';

@Component({
  selector: 'app-expadder',
  templateUrl: './expadder.component.html',
  styleUrls: ['./expadder.component.css']
})
export class ExpadderComponent implements OnInit {

  @ViewChild("newTank") newTank!:ElementRef;

  constructor(private ExperimentService:ExperimentsService) { }

  currentTankCapacity=0;
  MinTemp = 60;
  MaxTemp = 140;
  MinTime =80;
  MaxTime = 160;
  MinConc = 0;
  MaxConc = 0.08; 
  Temp :number | null=null;
  Time :number | null=null;
  Conc :number | null=null;
  nrRuns =0;
  currentTankAvailble =true;
  //tanknr is 0 or 1
  Experiments:{tanknr:string,temp:number,time:number,conc:number}[]=[];

  ngOnInit(): void {
    this.Temp= this.MinTemp;
    this.Time= this.MinTime;
    this.Conc = this.MinConc;
    this.currentTankCapacity=this.ExperimentService.getLastTankCapacity();
  }

  ngAfterViewInit():void{
  }

  addExp(){
    if(this.Experiments.length>=100){
      return;
    }
    let tanknr:string = this.newTank.nativeElement.value;
    if(tanknr=="0"){
      if(this.currentTankCapacity==0){
        this.currentTankAvailble=false;
        return;
      }else{
        this.currentTankCapacity-=1;
      }
    }
    if(tanknr=="1"){
      this.currentTankCapacity=this.ExperimentService.tankCapacity-1;
      this.currentTankAvailble=true;
    }
    if(this.Temp!=null && this.Time!=null && this.Conc!=null){
      this.Experiments.push({tanknr:tanknr,temp:this.Temp,time:this.Time,conc:this.Conc});
      this.nrRuns+=1;
      this.newTank.nativeElement.value = "0";
    }
  }

  performExps(){
    console.log("experiments added ........");
    this.ExperimentService.addNewExps(this.Experiments);
  }

}
