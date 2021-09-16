import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobdescriptionviewmasterRoutingModule } from './jobdescriptionviewmaster-routing.module';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { JobdescriptionviewmasterComponent } from './jobdescriptionviewmaster.component';


@NgModule({
  declarations: [
    JobdescriptionviewmasterComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    JobdescriptionviewmasterRoutingModule,
    
  ]
})
export class JobdescriptionviewmasterModule { }
