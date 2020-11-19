import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dialog',
  template: `
<div class="modal-header">
    <h4 class="modal-title">{{my_modal_title}}</h4>
  </div>
  <div class="modal-body"><pre class="response-class"> 
  {{my_modal_content}}</pre>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
  </div>
  `,
  styles: [`
  ::ng-deep .response-class {
    white-space: pre-wrap;
}
  `]
})
export class DialogComponent {
  @Input() my_modal_title;
  @Input() my_modal_content;

  constructor(public activeModal: NgbActiveModal) { }
}
