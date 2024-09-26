import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CostsheetreverseRoutingModule } from './costsheetreverse-routing.module';
import { CostsheetreverseComponent } from './costsheetreverse.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';


@NgModule({
  declarations: [
    CostsheetreverseComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CostsheetreverseRoutingModule
  ]
})
export class CostsheetreverseModule { }
