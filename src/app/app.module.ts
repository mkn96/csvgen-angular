import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CsvGeneratorComponent } from './csv-generator.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    CsvGeneratorComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
