import { NgModule, Optional, SkipSelf } from '@angular/core';
import { DbService } from '../services/db.service';
import { WindowsServiceClient } from '../services/windows.service';

@NgModule({
  providers: [
    DbService,
    WindowsServiceClient
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
