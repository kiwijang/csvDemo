import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CsvDemoComponent } from './csv-demo/csv-demo.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CsvDemoComponent],
  bootstrap: [AppComponent],
  providers: [{provide: APP_BASE_HREF, useValue: '/csvDemo/'}],
})
export class AppModule {}
