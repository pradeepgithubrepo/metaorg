import { Component, OnInit, Input } from '@angular/core';
import { SharingService } from '../message-transfer-service.service';
import { metaModel, metafullModel } from '../models/metarepo.model';
import { MetaserviceService } from '../metaservice.service';
import { flatten, unflatten } from 'flat';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { DialogComponent } from '../dialog/dialog.component'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { metadataModel } from '../models/metarepo.model';

@Component({
  selector: 'app-configedit',
  template: `
       <div class="container">
    <div class="row">
      <div class="col-md-3 mb-12"></div>
      <div class="col-md-6 mb-12">
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <formly-form [form]="form" [model]="model" [options]="options" [fields]="fields">
          </formly-form>
          <div class="row justify-content-center">
            <button class="btn btn-primary" type="submit">Update</button>
          </div>
        </form>
      </div>
      <div class="col-md-3 mb-12"></div>
</div>
  `,
  styles: [
  ]
})
export class ConfigeditComponent implements OnInit {
  form = new FormGroup({});
  model = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = null;

  public metadatamodel: metadataModel;
  public metafullinfo: metafullModel;
  constructor(private metaservice: MetaserviceService, private modalService: NgbModal,
    private sharingService: SharingService,) { }

  ngOnInit(): void {
    const sourceid = this.sharingService.getData()

    this.metaservice.getConfigMeta(sourceid).subscribe(data => {
      let flag = false;
      let data1 = JSON.parse(JSON.stringify(data[0]['metadata']));
      if (data[1]?.['metadata']) { flag = true; }
      let mergereddatamodel = null;
      if (flag == true) {
        let data2 = JSON.parse(JSON.stringify(data[1]['metadata']));
        mergereddatamodel = data1.concat(data2)
      } else {
        mergereddatamodel = data1
      }

      console.log("Merged Model" + JSON.stringify(mergereddatamodel))
      this.fields = mergereddatamodel;
      // this.fields = JSON.parse(JSON.stringify(this.metadatamodel.metadata))
    })

    this.metaservice.getSourceDetails(sourceid).subscribe(data => {
      this.metafullinfo = data
      var dataobj = JSON.parse(JSON.stringify(this.metafullinfo.metamap, null, 2))
      var flatdataobj = flatten(dataobj, { delimiter: '_' });
      for (var key in flatdataobj) {
        this.model[key] = flatdataobj[key];
      }
      this.model = { ... this.model }

    })
  }

  onSubmit() {
    if (this.form.valid) {
      this.payloadpush();
    }
  }


  payloadpush() {
    let currentmodel = this.model
    let unflattenedmodel = unflatten(currentmodel, { object: true, delimiter: '_' })

    console.log("jsonParsedArray : " + JSON.stringify(unflattenedmodel));
    var sourcename = currentmodel["source"]
    this.metaservice.updateMetarepo({ "source": sourcename, "metamap": JSON.stringify(unflattenedmodel) }).subscribe(data => {
      const modalRef = this.modalService.open(DialogComponent, { scrollable: true });
      modalRef.componentInstance.my_modal_title = 'Success!';
      modalRef.componentInstance.my_modal_content = 'Data updated successfully!';
    }, err => {
      const modalRef = this.modalService.open(DialogComponent, { scrollable: true });
      modalRef.componentInstance.my_modal_title = 'Error!';
      modalRef.componentInstance.my_modal_content = 'Update operation failed, Please check internet connectivity !';
      console.log("ERROR")
    }
    );
  }

}
