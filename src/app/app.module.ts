import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { LayoutModule } from './layout/layout.module';
import {HttpClientModule} from '@angular/common/http'
import {FormsModule} from '@angular/forms'
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { AdminComponent } from './layout/admin/admin.component';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component: DashboardComponent},
      {path: 'admin', component: AdminComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
