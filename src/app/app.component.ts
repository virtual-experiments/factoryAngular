import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'factoryAngular';

  constructor(public dialog: MatDialog){

  }

  openAboutDialog(): void {
    this.dialog.open(AboutDialogComponent,{width: '400px',height:'300px'});
  }

}


@Component({
  selector: 'app-about-dialog',
  templateUrl: './about-dialog.component.html',
  styleUrls: ['./about-dialog.component.css']
})
export class AboutDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

}