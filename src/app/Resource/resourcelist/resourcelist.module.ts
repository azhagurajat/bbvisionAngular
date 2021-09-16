import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResourcelistRoutingModule } from './resourcelist-routing.module';
import { ResourcelistComponent } from './resourcelist.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';


@NgModule({
  declarations: [
    ResourcelistComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ResourcelistRoutingModule
  ]
})
export class ResourcelistModule { }
