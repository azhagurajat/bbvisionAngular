import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobdescriptionviewmasterComponent } from './jobdescriptionviewmaster.component';

const routes: Routes = [{
  path: '',
  component: JobdescriptionviewmasterComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobdescriptionviewmasterRoutingModule { }
