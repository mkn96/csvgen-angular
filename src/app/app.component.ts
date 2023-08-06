import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div style="text-align: center;">
      <h1>Welcome to CSV Generator App!</h1>
      <app-csv-generator></app-csv-generator>
    </div>
  `,
})
export class AppComponent {}
