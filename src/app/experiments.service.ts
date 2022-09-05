import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExperimentsService {
  //each element of this array is an array which consists of the experiments run on the tank i where i-1 is the index in the Experiments array.
  Experiments:{response:number,temp:number,time:number,conc:number}[][]=[];
  //The list of the runnig experiments.
  runningExps:{response:number,temp:number,time:number,conc:number,tanknr:number,runnr:number,runnrTank:number}[]=[];
  tankCapacity=10;
  private messageSource = new BehaviorSubject(this.runningExps);
  currentMessage = this.messageSource.asObservable();
  newExps="new experiments";
  constructor() { }

  getLastTankCapacity(){
    let nrTanks=this.Experiments.length;
    if(nrTanks==0){
      return this.tankCapacity;
    }
    return this.tankCapacity -this.Experiments[nrTanks-1].length;
  }

  //tanknr is 0 or 1 indicating it is a new tank
  //precondition: tank capacity is not violated.
  addNewExps(exps:{tanknr:string,temp:number,time:number,conc:number}[]){
    if(exps==[]){
      return;
    }
    let runnr = this.getRunnr();
    let lasttank = this.Experiments.length;
    if(lasttank==0){
      this.Experiments.push([]);
      lasttank+=1;
    }
    let runnrtank = this.Experiments[lasttank-1].length;
    this.runningExps=[];
    for(let e of exps){
      runnr+=1;
      runnrtank+=1;
      //To DO : ADD THE CALCULATION OF THE RESPONSE.
      let response = 150;
      if(e.tanknr=="1"){
        lasttank+=1;
        this.Experiments.push([]);
        runnrtank=1;
      }
      this.runningExps.push({response:response,temp:e.temp,time:e.time,conc:e.conc,tanknr:lasttank,runnr:runnr,runnrTank:runnrtank});
      this.Experiments[lasttank-1].push({response:response,temp:e.temp,time:e.time,conc:e.conc});
    }
    const l = this.runningExps.length;
    this.messageSource.next(this.runningExps);
  }

  getRunnr(){
    let runnr =0;
    for(let t of this.Experiments){
      runnr+=t.length;
    }
    return runnr;
  }
  //table:{runnr:number,tanknr:number,runnrtank:number,temp:number,time:number,conc:number,resp:number}[]=[];
  getTable(){
    let table:{runnr:number,tanknr:number,runnrtank:number,temp:number,time:number,conc:number,resp:number}[]=[];
    let runnr=1;
    const tanks = this.Experiments.length;
    let t =0;
    while(t<tanks){
      let e =0;
      let exps = this.Experiments[t].length;
      while(e<exps){
        table.push({runnr:runnr,tanknr:t+1,runnrtank:e+1,temp:this.Experiments[t][e].response,time:this.Experiments[t][e].time,conc:this.Experiments[t][e].conc,resp:this.Experiments[t][e].response});
        e+=1;
        runnr+=1;
      }
      t+=1;
    }
    return table;
  }
}
