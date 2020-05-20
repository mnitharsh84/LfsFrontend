import { NgModule, ModuleWithProviders } from '@angular/core';
//import { appDirective } from './{your-path}';
import { CustomDatePipe } from 'src/app/shared/pipes/custom.datepipe';
//import { appService } from './{your-path}';

@NgModule({
declarations: [
CustomDatePipe,
//appDirective
],
exports: [
CustomDatePipe,
//appDirective
]
})
export class SharingModule {
static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharingModule,
     // providers: [ appService ]
    };
  }
}