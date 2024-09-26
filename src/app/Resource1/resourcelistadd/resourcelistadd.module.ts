import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { ResourcelistaddRoutingModule } from './resourcelistadd-routing.module';
import { ResourcelistaddComponent } from './resourcelistadd.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';




@NgModule({
  declarations: [
    ResourcelistaddComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ResourcelistaddRoutingModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class ResourcelistaddModule { }
