import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigaddComponent } from './configadd/configadd.component';

const routes: Routes = [{
  path: '',
  component: ConfigaddComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigsRoutingModule { }
