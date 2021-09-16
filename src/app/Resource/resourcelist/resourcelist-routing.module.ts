import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourcelistComponent } from './resourcelist.component';

const routes: Routes = [{ path: '', component: ResourcelistComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourcelistRoutingModule { }
