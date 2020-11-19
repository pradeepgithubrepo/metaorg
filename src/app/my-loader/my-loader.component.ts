import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-my-loader',
  template: `
    <div class="progress-loader" [hidden]="!loading">
    <div class="loading-spinner">
        <img src="assets/index.svg">
        <span class="loading-message">Please wait...</span>
    </div>
</div>
  `,
  styles: [`
.loading-spinner{    
    background-color: #0000001f;
    position: absolute;
    width: 100%;
    top: 0px;
    left: 0px;
    height: 100vh;
    align-items: center;
    justify-content: center;
    display: grid;
}

.loading-spinner img{
    align-self: end;
}

.loading-message{
    text-align: center;
    align-self: start;
}`

  ]
})
export class MyLoaderComponent implements OnInit {

  loading: boolean;

  constructor(private loaderService: LoaderService) {

    this.loaderService.isLoading.subscribe((v) => {
      console.log(v);
      this.loading = v;
    });

  }
  ngOnInit() {
  }

}
