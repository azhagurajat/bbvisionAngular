import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CostsheetComponent } from './costsheet.component';

const routes: Routes = [{ path: '', component: CostsheetComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CostsheetRoutingModule { }
