import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DarPageRoutingModule } from './dar-routing.module';

import { DarPage } from './dar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DarPageRoutingModule
  ],
  declarations: [DarPage]
})
export class DarPageModule {}
