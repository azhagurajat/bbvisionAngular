import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobdescriptionlistmasterRoutingModule } from './jobdescriptionlistmaster-routing.module';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { JobdescriptionlistmasterComponent } from './jobdescriptionlistmaster.component';


@NgModule({
  declarations: [
    JobdescriptionlistmasterComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    JobdescriptionlistmasterRoutingModule,
    
  ]
})
export class JobdescriptionlistmasterModule { }
