import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceformComponent } from './resourceform.component';

const routes: Routes = [{ path: '', component: ResourceformComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourceformRoutingModule { }
