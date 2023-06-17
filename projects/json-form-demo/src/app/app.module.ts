import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JsonFormModule } from '@christophhu/json-form';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    JsonFormModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
