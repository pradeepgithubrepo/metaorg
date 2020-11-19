import { Component, OnInit, ViewChild } from '@angular/core';
import { MetaserviceService } from '../metaservice.service';
import { metaModel, metafullModel } from '../models/metarepo.model';
import { DialogComponent } from '../dialog/dialog.component'
import { DialogConfirm } from '../dialog/dialog_confirm'
import { DialogInput } from '../dialog/dialog_input'
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { SharingService } from '../message-transfer-service.service';
import { metadataModel } from '../models/metarepo.model';

@Component({
  selector: 'app-configlist',
  template: `
   <div class="row">
      <div class="col-md-3 mb-12"></div>
      <div class="col-md-6 mb-12">

<table class="table table-striped">
<thead>
  <tr style="text-align:center">
    <th colspan="2"><b>Source List</b></th>
  </tr>
   </thead>
   <tbody>
      <tr *ngFor="let meta of metainfo" style="text-align:center">
              <td >{{ meta.source }}</td>
              <td>
              <button class="btn btn-info" (click)="viewSource($event, meta.source)">View</button>
              &nbsp;
              <button class="btn btn-info" (click)="editSource($event, meta.source)">Edit</button> 
              &nbsp;
              <button class="btn btn-info" (click)="deleteSource($event, meta.source)">Delete</button>
              &nbsp;
              <button class="btn btn-info" (click)="cloneSource($event, meta.source)">Clone</button> 
              </td>
  </tbody>
  </table>
      </div>
      <div class="col-md-3 mb-12"></div>
    </div>
  `,
  styles: [
  ]
})
export class ConfiglistComponent implements OnInit {
  public metainfo: metaModel;
  public metafullinfo: metafullModel;
  sourceId: String = '';
  constructor(private metaservice: MetaserviceService,
    private modalService: NgbModal, private sharingService: SharingService,
    private router: Router) { }

  viewSource(event, sourceid) {
    console.log(sourceid);
    this.metaservice.getSourceDetails(sourceid).subscribe(data => {
      console.log("View data -> " + JSON.stringify(data))

      this.metafullinfo = data
      const modalRef = this.modalService.open(DialogComponent, { scrollable: true });
      modalRef.componentInstance.my_modal_title = sourceid + ' Configuration';
      modalRef.componentInstance.my_modal_content = JSON.stringify(this.metafullinfo.metamap, null, 2);
    })
  }

  deleteSource(event, sourceid) {
    console.log(sourceid);
    const confirmmodalRef = this.modalService.open(DialogConfirm, { scrollable: true });
    confirmmodalRef.componentInstance.my_modal_title = 'Alert!';
    confirmmodalRef.componentInstance.my_modal_content = 'Are you sure you want to remove ' + sourceid + ' from DB permananetly?';

    confirmmodalRef.result.then((result) => {
      this.metaservice.deleteConfigMap(sourceid).subscribe(data => {
        const modalRef = this.modalService.open(DialogComponent, { scrollable: true });
        modalRef.componentInstance.my_modal_title = 'Success!';
        modalRef.componentInstance.my_modal_content = sourceid + ' removed successfully!';
        this.ngOnInit();
        console.log("Data purged")
      }, err => {
        const modalRef = this.modalService.open(DialogComponent, { scrollable: true });
        modalRef.componentInstance.my_modal_title = 'Failure!';
        modalRef.componentInstance.my_modal_content = sourceid + ' could not be Removed , re-try!';
        console.log("ERROR")
      }
      );
    }, (reason) => {
      console.log(`Dismissed : ${reason}`);
    });

  }

  cloneSource(event, sourceid) {
    const inputmodalRef = this.modalService.open(DialogInput, { scrollable: true });
    inputmodalRef.componentInstance.my_modal_title = 'Info!';
    inputmodalRef.result.then((result) => {
      let newsource = result['newsource'];
      console.log(`Value : ` + newsource);
      this.metaservice.getSourceDetails(sourceid).subscribe(data => {
        this.metafullinfo = data
        this.metafullinfo.metamap['source'] = newsource;
        console.log("getmapo" + JSON.stringify(this.metafullinfo.metamap));
        this.metaservice.createMetarepo({ "source": newsource, "metamap": JSON.stringify(this.metafullinfo.metamap) }).subscribe(data => {
          console.log("Data inserted")
          this.ngOnInit();
        }, err => {
          console.log("ERROR")
        }
        );
      })
    }, (reason) => {
      console.log(`Dismissed : ${reason}`);
    });

  }

  editSource(event, sourceid) {
    console.log(sourceid);
    this.sharingService.setData(sourceid);
    this.router.navigate(['/editconfig'])
      .then(success => console.log('navigation success?', success))
      .catch(console.error);
  }


  ngOnInit(): void {
    console.log("Loadin in onlinint")
    this.metaservice.getSourceName().subscribe(data => {
      this.metainfo = data['rows']
      console.log("data -> " + JSON.stringify(data))
    })
  }

}
