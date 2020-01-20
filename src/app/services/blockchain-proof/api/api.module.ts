import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BlockchainAgentConfiguration } from './blockchainAgentConfiguration';

import { BlockchainService } from './api/blockchain.service';

@NgModule({
  imports:      [ CommonModule, HttpClientModule ],
  declarations: [],
  exports:      [],
  providers: [
    BlockchainService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => BlockchainAgentConfiguration): ModuleWithProviders {
        return {
            ngModule: ApiModule,
            providers: [ { provide: BlockchainAgentConfiguration, useFactory: configurationFactory } ]
        }
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import your base AppModule only.');
        }
    }
}
