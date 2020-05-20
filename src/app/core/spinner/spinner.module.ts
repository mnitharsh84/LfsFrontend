import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

// import { throwIfAlreadyLoaded } from '../module-import-guard';
import { SpinnerComponent }   from './spinner.component';
import { SpinnerService }   from './spinner.service';

@NgModule({
  imports: [CommonModule, IonicModule],
  exports: [SpinnerComponent],
  declarations: [SpinnerComponent],
  providers: [SpinnerService]
})
export class SpinnerModule {
  constructor( @Optional() @SkipSelf() parentModule: SpinnerModule) {
    // throwIfAlreadyLoaded(parentModule, 'SpinnerModule')
  }
}