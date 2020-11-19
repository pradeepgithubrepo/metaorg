import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'dialog-input',
  template: `
<div class="modal-header">
    <h4 class="modal-title">{{my_modal_title}}</h4>
  </div>
  <div class="modal-body">
<form #sourceForm="ngForm" (ngSubmit)="getSourceinfo(sourceForm)">
  <label for="newsource">New Source Name :</label> &nbsp;
  <input type="text" name="newsource" id="newsource" ngModel>
        <div class="row justify-content-center">
            <button class="btn btn-primary" type="submit">Yes! Clone it</button>
          </div>
</form>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
  </div>
  `,
  styles: [`
  ::ng-deep .response-class {
    white-space: pre-wrap;
}
  `]
})
export class DialogInput {
  @Input() my_modal_title;

  getSourceinfo(form: NgForm) {
    this.modal.close(form.value);
    console.log(form.value);
  }
  constructor(public modal: NgbActiveModal) { }


}
