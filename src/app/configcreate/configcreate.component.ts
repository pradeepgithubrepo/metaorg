import { Component, OnInit } from '@angular/core';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { MetaserviceService } from '../metaservice.service';
import { DialogComponent } from '../dialog/dialog.component'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { flatten, unflatten } from 'flat';
import { metadataModel } from '../models/metarepo.model';

@Component({
  selector: 'app-configcreate',
  template: `
    <div class="container">
    <div class="row">
      <div class="col-md-3 mb-12"></div>
      <div class="col-md-6 mb-12">
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <formly-form [form]="form" [model]="model" [options]="options" [fields]="fields">
          </formly-form>
          <div class="row justify-content-center">
            <button class="btn btn-primary" type="submit">Submit</button>
          </div>
        </form>
      </div>
      <div class="col-md-3 mb-12"></div>
</div>
  `,
  styles: [
  ]
})
export class ConfigcreateComponent implements OnInit {
  form = new FormGroup({});
  model = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = null;

  public metadatamodel: metadataModel;
  constructor(private metaservice: MetaserviceService,
    private modalService: NgbModal) { }

  parseValue(object, path, value) {
    path = path.replace(/[\[]/gm, '.').replace(/[\]]/gm, ''); //to accept [index]
    var keys = path.split('.'),
      last = keys.pop();

    keys.reduce(function (o, k) { return o[k] = o[k] || {}; }, object)[last] = value;
  }

  onSubmit() {
    if (this.form.valid) {
      this.payloadprep();
    }
  }


  ngOnInit(): void {
    let dummysourceid = 'dummy'
    this.metaservice.getConfigMeta(dummysourceid).subscribe(data => {
      this.metadatamodel = data[0]
      console.log("Data fro create" + JSON.stringify(this.metadatamodel.metadata))
      this.fields = JSON.parse(JSON.stringify(this.metadatamodel.metadata))
    })

  }

  payloadprep() {
    // var createobj = {};
    // const searchRegExp = new RegExp('_', 'g'); // Throws SyntaxError
    // for (var key in this.model) {
    //   if (this.model.hasOwnProperty(key)) {
    //     this.parseValue(createobj, key.replace(searchRegExp, "."), this.model[key]);
    //   }
    // }

    let currentmodel = this.model
    let unflattenedmodel = unflatten(currentmodel, { object: true, delimiter: '_' })

    // console.log("jsonParsedArray : " + JSON.stringify(createobj));
    var sourcename = unflattenedmodel["source"]
    this.metaservice.createMetarepo({ "source": sourcename, "metamap": JSON.stringify(unflattenedmodel) }).subscribe(data => {
      this.options.resetModel();
      const modalRef = this.modalService.open(DialogComponent, { scrollable: true });
      modalRef.componentInstance.my_modal_title = 'Success!';
      modalRef.componentInstance.my_modal_content = 'Data persisted successfully!';
      console.log("Data inserted")
    }, err => {
      const modalRef = this.modalService.open(DialogComponent, { scrollable: true });
      modalRef.componentInstance.my_modal_title = 'Failure!';
      modalRef.componentInstance.my_modal_content = 'Data not saved, Check if key already present !';
      console.log("ERROR")
    }
    );
  }

}
