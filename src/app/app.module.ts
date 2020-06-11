import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DragulaModule } from 'ng2-dragula';

import { AppComponent } from './app.component';
import { WorkareaComponent } from './workarea/workarea.component';
import { ToolsComponent } from './tools/tools.component';
import { AttributesComponent } from './attributes/attributes.component';
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [
    AppComponent,
    WorkareaComponent,
    ToolsComponent,
    AttributesComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DragulaModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
