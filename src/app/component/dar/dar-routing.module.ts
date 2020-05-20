import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DarPage } from './dar.page';
//import { SharingModule } from 'src/app/shared/SharingModule';
const routes: Routes = [
  {
    path: '',
    component: DarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes) ],
  exports: [RouterModule],
})
export class DarPageRoutingModule {}
