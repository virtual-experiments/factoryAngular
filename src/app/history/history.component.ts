import { Component, OnInit } from '@angular/core';
import {ExperimentsService} from '../experiments.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  table:{runnr:number,tanknr:number,runnrtank:number,temp:number,time:number,conc:number,resp:number}[]=[];

  constructor(private ExperimentService:ExperimentsService) { }

  ngOnInit(): void {
    this.table=this.ExperimentService.getTable();
  }



}
