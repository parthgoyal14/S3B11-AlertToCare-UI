import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'bed-comp',
  templateUrl: './bed.component.html',
  styleUrls: ['./bed.component.css']
})
export class BedComponent implements OnInit {

  @Input('bed') bed;
  constructor() { }

  patient: any;

  ngOnInit(): void {
    
  }

}
