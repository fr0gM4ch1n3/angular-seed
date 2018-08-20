import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';

import { throwIfAlreadyLoaded } from './module-import-guard';

@NgModule({
  imports: [RouterModule],
  declarations: [],
  exports: [RouterModule]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
