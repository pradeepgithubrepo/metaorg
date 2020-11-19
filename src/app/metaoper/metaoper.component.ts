import { Component, OnInit } from '@angular/core';
import { MetaserviceService } from '../metaservice.service';

@Component({
  selector: 'app-metaoper',
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
  `,
  styles: [
  ]
})
export class MetaoperComponent implements OnInit {

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

}
