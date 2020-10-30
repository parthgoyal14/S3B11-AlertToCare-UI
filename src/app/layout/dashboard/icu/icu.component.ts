import { Component, Input, OnInit } from '@angular/core';
import { BedService } from '../../services/bed.service';
import {OccupancyService} from '../../services/occupancy.service'
import {Bed} from '../../models/bed'
import { Occupancy } from '../../models/occupancy';

@Component({
  selector: 'icu-comp',
  templateUrl: './icu.component.html',
  styleUrls: ['./icu.component.css']
})
export class IcuComponent implements OnInit {

  beds: Bed[];

  @Input('icu') icu;
  constructor(private bedService: BedService, private occupancyService: OccupancyService) { }

  ngOnInit(): void {
    this.bedService.getAllBedsForParticularIcu(this.icu.id).subscribe(data =>{
      this.beds = data.sort((a, b) => (a.id > b.id) ? 1 : -1);
    });
  }

}
