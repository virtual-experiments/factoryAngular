import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ExperimentsService {

  //each element of this array is an array which consists of the experiments run on the tank i where i-1 is the index in the Experiments array.
  Experiments:{response:number,temp:number,time:number,conc:number}[][]=[];

  //The list of the latest performed experiments.
  runningExps:{response:number,temp:number,time:number,conc:number,tanknr:number,runnr:number,runnrTank:number}[]=[];

  performedExps:{response:number,temp:number,time:number,conc:number,tanknr:number,runnr:number,runnrTank:number}[]=[];

  tankCapacity=10;

  default={response:0,temp:0,time:0,conc:0,tanknr:0,runnr:0,runnrTank:0};
  private messageSource = new BehaviorSubject(this.default);
  currentMessage = this.messageSource.asObservable();

  timeouts:any[]=[];
  
  experimenttimeinterval = 2000;

  experimentCost = 226.89;
  constructor() { }

  getLastTankCapacity(){
    let nrTanks=this.Experiments.length;
    if(nrTanks==0){
      return this.tankCapacity;
    }
    return this.tankCapacity -this.Experiments[nrTanks-1].length;
  }

  boxMullerTransform() {
    const u1 = Math.random();
    const u2 = Math.random();
    
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    const z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);
    
    return { z0, z1 };
  }

  NextGaussian(mean:number, stddev:number) {
    const { z0, z1 } = this.boxMullerTransform();
    
    return z0 * stddev + mean;
  }

  Response( temp:number, time:number,  conc:number, block:number, error:number, phase:number) {
    let xtemp = (temp - 60.0) / 80.0;
    let ytime = (time - 80.0) / 80.0;
    let zconc = conc / 0.08;
    xtemp = 1.0 - xtemp;
    ytime = 1.0 - ytime;
    zconc = 1.0 - zconc;
    let resp = 0.0;
    let resp2 = -40.0 * Math.pow(xtemp, 2.0) + 16.0 * xtemp - 14.4 * Math.pow(ytime, 2.0) - 9.6 * ytime + 10.0 + 48.0 * xtemp * ytime + 10.0 / ((xtemp + 1.0) * (2.0 - ytime));
    if (resp2 > 0.0) {
        resp += resp2;
    }
    let resp3 = -325.0 * Math.pow(xtemp, 3.0) + 310.0 * Math.pow(xtemp, 2.0) - 48.0 * xtemp - 58.0 * Math.pow(zconc, 3.0) + 145.0 * Math.pow(zconc, 2.0) - 78.0 * zconc + 32.0 + (260.0 * xtemp - 177.0 * zconc - 22.0) * xtemp * zconc;
    if (resp3 > 0.0) {
        resp += resp3;
    }
    resp = resp * 0.21045247281655557 * 1.0178117048346056;
    resp = resp * block * error;
    let trend = 1.0 + 0.05 * Math.sin(phase);
    resp *= trend;
    resp *= 1000.0;
    let euroResp = resp * 0.453780126;
    let rest = Math.floor(euroResp * 1000.0) - (Math.floor(euroResp * 100.0) * 10.0);
    if (rest < 5) {
        euroResp = Math.floor(euroResp * 100.0) / 100.0;
    }
    else {
        euroResp = (Math.floor(euroResp * 100.0) + 1.0) / 100.0;
    }
    return euroResp;
  }

  compute(){

  }
  //tanknr is 0 or 1 indicating it is a new tank
  //precondition: tank capacity is not violated.
  addNewExps(exps:{tanknr:string,temp:number,time:number,conc:number}[]){
    if(exps.length==0){
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
    this.performedExps=[];
    this.timeouts=[];
    for(let e of exps){
      runnr+=1;
      runnrtank+=1;
      //To DO : ADD THE CALCULATION OF THE RESPONSE.
      let block = this.NextGaussian(1.0, 0.04);
      let error = this.NextGaussian(1.0, 0.04);
      let phase = this.NextGaussian(0.0, 10.0);
      let response = this.Response(e.temp,e.time,e.conc,block,error,phase);
      if(e.tanknr=="1"){
        lasttank+=1;
        this.Experiments.push([]);
        runnrtank=1;
      }
      this.runningExps.push({response:response,temp:e.temp,time:e.time,conc:e.conc,tanknr:lasttank,runnr:runnr,runnrTank:runnrtank});
      //this.Experiments[lasttank-1].push({response:response,temp:e.temp,time:e.time,conc:e.conc});
    }
    //this.messageSource.next(this.runningExps);
    this.sendexps();
  }

  sendexps(){
    let i =0;
    const l = this.runningExps.length;
    console.log("sendExps pilot" +l);
    while(i<l+1){
      let t=setTimeout((that:ExperimentsService,message:{response:number,temp:number,time:number,conc:number,tanknr:number,runnr:number,runnrTank:number},i:number)=>{
        if(i<l){
          //console.log(message);
          that.messageSource.next(message);
          that.Experiments[message.tanknr-1].push({response:message.response,temp:message.temp,time:message.time,conc:message.conc});
          that.performedExps.push(message);
        }else{
          //message showing the end of experiments
          this.messageSource.next(this.default);
        }
        
      },
      this.experimenttimeinterval*(i),this,this.runningExps[i],i);
      this.timeouts.push(t);

      i+=1;
    }
    
  }

  stopRunningExps(){
    this.messageSource.next(this.default);
    for(let t of this.timeouts){
      clearTimeout(t);
    }
    //this.timeouts.forEach((value)=>clearTimeout(value));
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
        table.push({runnr:runnr,tanknr:t+1,runnrtank:e+1,temp:this.Experiments[t][e].temp,time:this.Experiments[t][e].time,conc:this.Experiments[t][e].conc,resp:this.Experiments[t][e].response});
        e+=1;
        runnr+=1;
      }
      t+=1;
    }
    return table;
  }
}
