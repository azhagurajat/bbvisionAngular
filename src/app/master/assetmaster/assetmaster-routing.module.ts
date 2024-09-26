import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetmasterComponent } from './assetmaster.component';



const routes: Routes = [{ path: '', component: AssetmasterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetmasterRoutingModule { }
