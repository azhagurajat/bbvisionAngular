import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetmasteraddsComponent } from './assetmasteradds.component';

const routes: Routes = [{ path: '', component: AssetmasteraddsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetmasteraddsRoutingModule { }
