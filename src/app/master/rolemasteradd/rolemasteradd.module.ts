import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolemasteraddRoutingModule } from './rolemasteradd-routing.module';
import { RolemasteraddComponent } from './rolemasteradd.component';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared/shared.module';


@NgModule({
  declarations: [RolemasteraddComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RolemasteraddRoutingModule
  ]
})
export class RolemasteraddModule { }
