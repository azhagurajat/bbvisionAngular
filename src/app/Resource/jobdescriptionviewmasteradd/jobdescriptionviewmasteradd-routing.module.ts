import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobdescriptionviewmasteraddComponent } from './jobdescriptionviewmasteradd.component';

const routes: Routes = [{
  path: '',
  component: JobdescriptionviewmasteraddComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobdescriptionviewmasteraddRoutingModule { }
