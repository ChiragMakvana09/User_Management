import { NgModule, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { FormsModule, ReactiveFormsModule,Validators } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { AfterViewInit, Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import {Employee} from '../app/model/emp'
import {MatDialog, MatDialogModule} from '@angular/material/dialog';



@NgModule({
  declarations: [
    AppComponent,
    UserManagementComponent
  ],
  imports: [
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    FormsModule,
    MatSliderModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
