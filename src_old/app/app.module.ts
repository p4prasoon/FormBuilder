import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DragulaModule } from 'ng2-dragula';

import { AppComponent } from './app.component';
import { WorkareaComponent } from './workarea/workarea.component';

@NgModule({
  declarations: [
    AppComponent,
    WorkareaComponent
  ],
  imports: [
    BrowserModule,
    DragulaModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
