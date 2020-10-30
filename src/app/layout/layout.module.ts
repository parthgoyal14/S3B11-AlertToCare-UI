import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IcuComponent } from './dashboard/icu/icu.component';
import { BedComponent } from './dashboard/bed/bed.component';
import { PatientComponent } from './dashboard/patient/patient.component';
import { AdminComponent } from './admin/admin.component';



@NgModule({
  declarations: [HeaderComponent, DashboardComponent, IcuComponent, BedComponent, PatientComponent, AdminComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [HeaderComponent, DashboardComponent, AdminComponent]
})
export class LayoutModule { }
