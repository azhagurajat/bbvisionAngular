import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobdescriptionviewmasteraddRoutingModule } from './jobdescriptionviewmasteradd-routing.module';
import { JobdescriptionviewmasteraddComponent } from './jobdescriptionviewmasteradd.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [JobdescriptionviewmasteraddComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    JobdescriptionviewmasteraddRoutingModule
  ]
})
export class JobdescriptionviewmasteraddModule { }
