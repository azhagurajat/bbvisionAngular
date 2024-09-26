import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceformRoutingModule } from './resourceform-routing.module';
import { ResourceformComponent } from './resourceform.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { MatInputModule,  } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    ResourceformComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatInputModule,
    ResourceformRoutingModule,
    MatSelectModule
  ]
})
export class ResourceformModule { }
