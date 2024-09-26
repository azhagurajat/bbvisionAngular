import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CostsheetaddComponent } from './costsheetadd.component';

const routes: Routes = [{ path: '', component: CostsheetaddComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CostsheetaddRoutingModule { }
