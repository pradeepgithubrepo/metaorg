import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { ConfigcreateComponent } from './configcreate/configcreate.component';
import { HeaderComponent } from './header/header.component';
import { MetaserviceService } from './metaservice.service';
import { ConfiglistComponent } from './configlist/configlist.component';
import { DialogComponent } from './dialog/dialog.component'
import { DialogConfirm } from './dialog/dialog_confirm'
import { DialogInput } from './dialog/dialog_input'
import { CommonModule } from '@angular/common';
import { MyLoaderComponent } from './my-loader/my-loader.component';
import { LoaderService } from './loader.service';
import { LoaderInterceptor } from './loader-interceptor.service';
import { ConfigeditComponent } from './configedit/configedit.component';
import { SharingService } from './message-transfer-service.service';
import { OrccreateComponent } from './orccreate/orccreate.component'
import { FormlyFieldStepper } from './orccreate/stepper.type';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper';
import { MetaoperComponent } from './metaoper/metaoper.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfigcreateComponent,
    HeaderComponent,
    ConfiglistComponent,
    DialogComponent,
    DialogConfirm,
    DialogInput,
    MyLoaderComponent,
    ConfigeditComponent,
    FormlyFieldStepper,
    OrccreateComponent,
    MetaoperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatStepperModule,
    FormlyModule.forRoot(
      {
        extras: { lazyRender: true },
        validationMessages: [
          { name: 'required', message: 'This field is required' },
        ],
        types: [
          { name: 'stepper', component: FormlyFieldStepper, wrappers: ['form-field'] },
        ],
      }
    ),
    FormlyBootstrapModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [MetaserviceService, LoaderService, SharingService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  entryComponents: [
    DialogComponent
  ], bootstrap: [AppComponent]
})
export class AppModule { }
