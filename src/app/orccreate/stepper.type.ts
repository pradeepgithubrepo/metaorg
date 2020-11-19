import { Component } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
    selector: 'formly-field-stepper',
    template: `
  <mat-horizontal-stepper>
   <div class="container">
    <mat-step
      *ngFor="let step of field.fieldGroup; let index = index; let last = last;">
      <ng-template matStepLabel>{{ step.templateOptions.label }}</ng-template>
      <div class="row">
      <div class="col-md-4 mb-12"></div>
      <div class="col-md-4 mb-12">
      <formly-field [field]="step"></formly-field>
      </div>
      <div class="col-md-4 mb-12"></div>
      </div>

      <div class="row">
      <div class="col-md-5 mb-12"></div>
      <div class="col-md-3 mb-12">
      <div>
        <button matStepperPrevious *ngIf="index !== 0"
          class="btn btn-primary"
          type="button">
          Back
        </button>&nbsp;

        <button matStepperNext *ngIf="!last"
          class="btn btn-primary" type="button"
          [disabled]="!isValid(step)">
          Next
        </button>

        <button *ngIf="last" class="btn btn-primary"
          [disabled]="!form.valid"
          type="submit">
          Submit
        </button>
      </div>
            </div>
      <div class="col-md-4 mb-12"></div>
      </div>
    </mat-step>
    </div>
  </mat-horizontal-stepper>
`,
})
export class FormlyFieldStepper extends FieldType {
    isValid(field: FormlyFieldConfig) {
        if (field.key) {
            return field.formControl.valid;
        }

        return field.fieldGroup.every(f => this.isValid(f));
    }
}
