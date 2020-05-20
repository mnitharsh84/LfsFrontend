
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceHomePage } from './service-home.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: ServiceHomePage }])
  ],
  declarations: [ServiceHomePage]
})
export class ServiceHomePageModule {}
