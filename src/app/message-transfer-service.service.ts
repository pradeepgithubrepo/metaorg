import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class SharingService {
  private data: any = undefined;

  setData(data: any) {
    this.data = data;
  }

  getData(): any {
    return this.data;
  }

  constructor() { }
}
