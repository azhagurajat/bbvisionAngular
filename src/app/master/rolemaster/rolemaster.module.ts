import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolemasterRoutingModule } from './rolemaster-routing.module';

import { RolemasterComponent } from './rolemaster.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';


@NgModule({
  declarations: [
    RolemasterComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    RolemasterRoutingModule,
    
  ]
})
export class RolemasterModule { }
