import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CostsheetRoutingModule } from './costsheet-routing.module';
import { CostsheetComponent } from './costsheet.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';


@NgModule({
  declarations: [
    CostsheetComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CostsheetRoutingModule
  ]
})
export class CostsheetModule { }
