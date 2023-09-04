import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { JsonFormModule } from '@christophhu/json-form';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    JsonFormModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
