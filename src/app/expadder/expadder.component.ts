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
  //used to indicate the division of experiments within tanks
  tanks:number[]=[];

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
        if(this.tanks.length==0){
          this.tanks.push(1);
        }
        else{
          const ltnkindex = this.tanks.length-1;
          this.tanks[ltnkindex] +=1;
        }
        
      }
    }
    if(tanknr=="1"){
      this.currentTankCapacity=this.ExperimentService.tankCapacity-1;
      this.currentTankAvailble=true;
      if(this.tanks.length==0){
        this.tanks.push(1);
      }
      else{
        const ltnkindex = this.tanks.length-1;
        this.tanks.push(this.tanks[ltnkindex] +1);
      }
    }
    if(this.Temp!=null && this.Time!=null && this.Conc!=null){
      this.Experiments.push({tanknr:tanknr,temp:this.Temp,time:this.Time,conc:this.Conc});
      this.nrRuns+=1;
      this.newTank.nativeElement.value = "0";
    }
    //console.log(this.tanks);
  }

  randomize(){
    if(this.Experiments.length==0){
      return;
    }
    let tempExps=[];
    for(let e of this.Experiments){
      if(e.tanknr=="0"){
        e.tanknr="0.0";
      }
      else if(e.tanknr=="1"){
        e.tanknr ="1.0";
      }
    }
    let i =0;
    const tnkl = this.tanks.length;
    while(i<tnkl){
      const end = this.tanks[i];
      let start =0;
      if(i!=0){
        start = this.tanks[i-1];
      }
      const l = end-start;
      let j =start;
      let filled =[];
      let p=0;
      while(p<l){
        filled.push(false);
        p+=1;
      }
      while(j<end){
        let randind = Math.floor(Math.random()*l);
        while(filled[randind]){
          randind = Math.floor(Math.random()*l);
        }
        filled[randind]=true;
        randind+=start;
        //console.log(randind);
        tempExps[randind]={tanknr:this.Experiments[j].tanknr,conc:this.Experiments[j].conc,time:this.Experiments[j].time,temp:this.Experiments[j].temp};
        if(j==start && randind!=start){
          tempExps[randind].tanknr="0.0";
        }
        else if(randind==start && this.Experiments[start].tanknr=="1.0"){
          tempExps[randind].tanknr="1.0";
        }
        j+=1;
      }

      i+=1;
    }
    this.Experiments = tempExps;
  }

  performExps(){
    console.log("experiments added ........");
    this.ExperimentService.addNewExps(this.Experiments);
  }



}
