import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
    <app-my-loader></app-my-loader>
  `,
  styles: []
})
export class AppComponent {
  title = 'metaorg';
}
