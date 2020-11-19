import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigcreateComponent } from './configcreate/configcreate.component';
import { ConfigeditComponent } from './configedit/configedit.component';
import { ConfiglistComponent } from './configlist/configlist.component';
import { ConfigaddComponent } from './configs/configadd/configadd.component';
import { MetaoperComponent } from './metaoper/metaoper.component';
import { OrccreateComponent } from './orccreate/orccreate.component';

const routes: Routes = [{
  path: '',
  component: ConfigaddComponent,
  pathMatch: 'full'
},
{
  path: 'addconfig',
  component: ConfigcreateComponent
  // loadChildren: () => import('./configs/configs.module').then(m => m.ConfigsModule)
},
{
  path: 'listconfig',
  component: ConfiglistComponent
},
{
  path: 'editconfig',
  component: ConfigeditComponent
},
{
  path: 'addorc',
  component: OrccreateComponent
},
{
  path: 'metaop',
  component: MetaoperComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
