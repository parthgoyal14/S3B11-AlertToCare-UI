import { Icu } from '../models/icu';
import { Component, OnInit } from '@angular/core';
import {IcuService} from '../services/icu.service'

@Component({
  selector: 'dashboard-comp',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  icus: Icu[];

  constructor(private icuService: IcuService) { }

  ngOnInit(): void {
    this.icuService.getAllIcus().subscribe(data =>{
      this.icus = data;
    });
  }

}
