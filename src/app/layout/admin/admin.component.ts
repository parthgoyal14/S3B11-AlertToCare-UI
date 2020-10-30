import { Component, OnInit } from '@angular/core';
import { Icu } from '../models/icu'
import { Patient } from '../models/patient';
import { IcuService } from '../services/icu.service'
import { OccupancyService } from '../services/occupancy.service';
import { PatientService } from '../services/patient.service';
import { BedService } from '../services/bed.service'
import { MonitorService } from '../services/monitor.service'
import { filter, map } from 'rxjs/operators';
import { Bed } from '../models/bed'
@Component({
  selector: 'admin-comp',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  //utility

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  filterById(list, id) {
    for (let item of list) {
      if (item.id == id) {
        return item;
      }
    }
  }

  filterByBedNotNull(list){
    let listOfMonitorsWithBedIdNotNull = [];
    for(let item of list){
      if(item.bed != null){
        listOfMonitorsWithBedIdNotNull.push(item)
      }
    }return listOfMonitorsWithBedIdNotNull;
  }

  filterByOccupiedFlagTrue(list){
    let listOfMonitorsWithOccupiedFlagTrue = [];
    for(let item of list){
      if(item.bed.occupiedFlag == true){
        listOfMonitorsWithOccupiedFlagTrue.push(item)
      }
    }return listOfMonitorsWithOccupiedFlagTrue
  }

  //ICU
  lastCreatedIcu: Icu;

  createIcu(formData) {
    console.log(formData.value)
    this.icuService.save({ "label": formData.value.label, "bedCount": formData.value.bedCount }).subscribe(
      data => {
        this.lastCreatedIcu = data;
      }
    )
    formData.reset()
  }



  //Patient and Occupancy
  lastAdmittedPatient;
  icus: Icu[];
  selectedIcu;
  beds: Bed[];

  private setBeds() {
    this.bedService.getAllBedsForParticularIcu(this.selectedIcu).pipe(map(beds => beds.filter(bed => bed.occupiedFlag == "0"))).subscribe(data => {
      this.beds = data;
    });
  }

  changeIcu(e) {
    console.log(e.target.value);
    this.selectedIcu = e.target.value;
    this.setBeds();
  }

  savePatient(formData) {
    this.patientService.save({
      "name": formData.value.name,
      "address": formData.value.address,
      "age": formData.value.age,
      "gender": formData.value.gender,
      "contact": formData.value.contact,
      "staffdetails_id": "1"
    }).subscribe(
      data => {
        this.lastAdmittedPatient = data;;
      }
    )
  }

  async admitPatient(formData) {
    this.savePatient(formData)

    await this.delay(300);

    let obj = {
      "bed": this.filterById(this.beds, formData.value.bed),
      "patient": this.lastAdmittedPatient,
      "icu": this.filterById(this.icus, formData.value.icu)
    }
    this.occupancyService.save(obj).subscribe(data => {
      console.log(data)
    })
    formData.reset()
  }


  //DischargePatient
  lastDischargedPatient;
  patients;

  dischargePatient(formData) {
    this.lastDischargedPatient = this.filterById(this.patients, formData.value.patient)
    this.patientService.deletePatient(formData.value.patient).subscribe(
      data => {
        if (data['Deleted'] == "1") {
          console.log("deleted")
        }
      }
    )
    formData.reset()
  }


  //Change Monitor for particular bed
  newMonitor;
  monitors;

  saveMonitor(formData) {
    this.monitorService.save({
      "id":formData.value.newMonitorId
    }).subscribe(
      data => {
        this.newMonitor = data;
      }
    )
  }

  async changeMonitor(formData) {
    this.saveMonitor(formData)

    await this.delay(300);

    this.bedService.changeMonitor(formData.value.bedId, formData.value.newMonitorId).subscribe(data => {
      console.log(data)
    })
    formData.reset()
  }


  //Send Vitals

  message
  monitorsWithPatients
  async sendVitals(formData){
    let monitorObj = this.filterById(this.monitors, formData.value.monitor)
    let obj = {}
    obj['id'] = formData.value.monitor;
    obj['bp'] = formData.value.bp;
    obj['spo2'] = formData.value.spo2;
    obj['respiratoryrate'] = formData.value.respRate;
    obj['bed'] = monitorObj.bed;
    console.log(obj)
    await this.delay(300);
    this.monitorService.sendVitals(obj).subscribe(data =>{
      console.log(data);
    })
    this.message="Vitals readings sent successfully to Monitor"
    formData.reset()
  }

  constructor(private icuService: IcuService, private bedService: BedService, private patientService: PatientService, private occupancyService: OccupancyService, private monitorService: MonitorService) { }

  async ngOnInit(): Promise<void> {
    this.icuService.getAllIcus().subscribe(data => {
      this.icus = data;
    });

    this.patientService.getAllPatients().subscribe(data => {
      this.patients = data;
    })

    this.monitorService.getAllMonitors().subscribe(data =>{
      this.monitors = this.filterByBedNotNull(data);
    })

    await this.delay(300)

    this.monitorsWithPatients = this.filterByOccupiedFlagTrue(this.monitors);
    console.log(this.monitorsWithPatients)
  }

}
