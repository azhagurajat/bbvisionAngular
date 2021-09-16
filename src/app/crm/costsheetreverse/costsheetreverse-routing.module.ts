import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CostsheetreverseComponent } from './costsheetreverse.component';

const routes: Routes = [{ path: '', component: CostsheetreverseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CostsheetreverseRoutingModule { }
