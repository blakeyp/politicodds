import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EventPickerComponent } from './event-picker/event-picker.component';
import { OddsTableComponent } from './odds-table/odds-table.component';
import { EventOddsTablePickerComponent } from './event-odds-table-picker/event-odds-table-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    EventPickerComponent,
    OddsTableComponent,
    EventOddsTablePickerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
