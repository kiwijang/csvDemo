import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CsvDemoComponent } from './csv-demo/csv-demo.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CsvDemoComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
