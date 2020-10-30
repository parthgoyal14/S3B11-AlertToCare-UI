import { Component, OnInit, Input } from '@angular/core';
import {OccupancyService} from '../../services/occupancy.service'

@Component({
  selector: 'patient-comp',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  //utility
  filterOccupancyByBedId(list, bedId){
    for (let item of list){
      if (item.bed.id == bedId){
        return item;
      }
    }
  }

  getPatient(bedId){
    console.log(bedId)
    return this.filterOccupancyByBedId(this.occupancies, bedId).patient;
  }

  occupancies: any[];

  @Input('bed') bed;
  constructor(private occupancyService: OccupancyService) { }

  ngOnInit(): void {
    
    this.occupancyService.getAllOccupanciesForParticularIcu(this.bed.icu.id).subscribe(data =>{
      this.occupancies = data;
    })
  }

}
