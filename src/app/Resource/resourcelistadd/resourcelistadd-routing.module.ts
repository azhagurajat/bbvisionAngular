import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourcelistaddComponent } from './resourcelistadd.component';

const routes: Routes = [{ path: '', component: ResourcelistaddComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourcelistaddRoutingModule { }
