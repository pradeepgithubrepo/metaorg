import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class MetaserviceService {

  constructor(private http: HttpClient) {

  }
  createMetarepo(postData) {
    return this.http.post<any>('http://localhost:3000/postconfigmap', postData)
  };

  updateMetarepo(postData) {
    return this.http.post<any>('http://localhost:3000/updateConfigmap', postData)
  };

  getSourceName() {
    return this.http.get<any>(`http://localhost:3000/getconfigmap`)
  };

  getSourceDetails(sourceid) {
    let url = "http://localhost:3000/getsingleconfig/" + sourceid;
    console.log(url)
    return this.http.get<any>(`${url}`)
  };

  getConfigMeta(sourceid) {
    let url = "http://localhost:3000/getmetadata/" + sourceid;
    return this.http.get<any>(`${url}`)
  }

  deleteConfigMap(sourceid) {
    let url = "http://localhost:3000/delconfigmap/" + sourceid;
    console.log(url)
    return this.http.delete<any>(`${url}`)
  };
}
