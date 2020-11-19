import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { MetaserviceService } from '../metaservice.service';

@Component({
  selector: 'app-orccreate',
  template: `
  <div class="container">
    <div class="row">
      <div class="col-md-3 mb-12"></div>
      <div class="col-md-2 mb-12"> <b> Select Source:</b></div>
      <div class="col-md-3 mb-12"> 
  <select>
    <option *ngFor="let source of allsource" value={{source}}>
      {{source}}
    </option>
  </select>
   </div>
      <div class="col-md-4 mb-12"></div>
      </div>
      </div>
    <form [formGroup]="form" (ngSubmit)="submit()">
  <formly-form [model]="model" [fields]="fields" [options]="options" [form]="form"></formly-form>
</form>
  `,
  styles: [
  ]
})
export class OrccreateComponent implements OnInit {
  allsource: String[] = [];
  constructor(private metaservice: MetaserviceService,) { }

  ngOnInit(): void {
    this.metaservice.getSourceName().subscribe(data => {
      for (var ele of data['rows']) {
        this.allsource.push(ele['source'])
      }
      console.log("this.allsource -> " + this.allsource)
    })
  }

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [{
    type: 'stepper',
    fieldGroup: [
      {
        templateOptions: { label: 'Stage1 - File Onboarding' },
        fieldGroup: [
          {
            key: 'stage1_fileonboarding',
            type: 'radio',
            templateOptions: {
              label: 'Ingestion mode',
              required: true,
              options: [
                { value: "nfscopy", label: 'Copy from NFS' },
                { value: "ftpcopy", label: 'Copy thru FTP' },
                { value: "realtime", label: 'Realtime loading' },
              ],
            },
          },
        ],
      }, {
        templateOptions: { label: 'Stage2 - Data Persistance Services' },
        fieldGroup: [
          {
            "type": "multicheckbox",
            "key": "data_persistance_service",
            "templateOptions": {
              "label": "Data Persistance Operations",
              "options": [
                {
                  "key": "bronzeload",
                  "value": "Bronze Load",
                },
                {
                  "key": "silverload",
                  "value": "Silver Load"
                },
                {
                  "key": "goldload",
                  "value": "Gold Load"
                }
              ]
            }
          }

        ],
      },
      {
        templateOptions: { label: 'Stage3 - Data Quality Services' },
        fieldGroup: [
          {
            "type": "multicheckbox",
            "key": "data_quality_service",
            "templateOptions": {
              "label": "Data Quality Operations",
              "options": [
                {
                  "key": "phonestandarization",
                  "value": "Phone Standarization",
                },
                {
                  "key": "addressstandarization",
                  "value": "Address Standarization"
                },
                {
                  "key": "namestandarization",
                  "value": "Name Standarization"
                },
                {
                  "key": "lookupservice",
                  "value": "Lookup Service"
                }
              ]
            }
          }

        ],
      },
      {
        templateOptions: { label: 'Stage4 - Data Delivery Service' },
        fieldGroup: [
          {
            "type": "multicheckbox",
            "key": "data_delivery_service",
            "templateOptions": {
              "label": "Data Delivery Operations",
              "options": [
                {
                  "key": "dispersal",
                  "value": "Dispersal",
                },
                {
                  "key": "recon",
                  "value": "Reconcillation"
                },
                {
                  "key": "email",
                  "value": "Email Communication"
                },
                {
                  "key": "metrics",
                  "value": "Metrics"
                }
              ]
            }
          }

        ],
      }, {
        templateOptions: { label: 'Stage5 - post Processing' },
        fieldGroup: [
          {
            "type": "multicheckbox",
            "key": "post_processing_service",
            "templateOptions": {
              "label": "Post Procesing Operations",
              "options": [
                {
                  "key": "archive",
                  "value": "Archive",
                },
                {
                  "key": "purge",
                  "value": "Purge"
                }
              ]
            }
          }

        ],
      }
    ],
  }];

  submit() {
    alert(JSON.stringify(this.model));

  }
}
