import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CostsheetaddRoutingModule } from './costsheetadd-routing.module';
import { CostsheetaddComponent } from './costsheetadd.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import {MatTableModule} from '@angular/material/table' 


@NgModule({
  declarations: [
    CostsheetaddComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    CKEditorModule,
    MatTableModule,
    CostsheetaddRoutingModule
  ]
})
export class CostsheetaddModule { }
