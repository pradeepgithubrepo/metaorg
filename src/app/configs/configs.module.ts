import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigsRoutingModule } from './configs-routing.module';
import { ConfigaddComponent } from './configadd/configadd.component';


@NgModule({
  declarations: [ConfigaddComponent],
  imports: [
    CommonModule,
    ConfigsRoutingModule,
  ]
})
export class ConfigsModule { }
