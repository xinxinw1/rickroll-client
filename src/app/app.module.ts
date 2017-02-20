import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent }  from './app.component';
import { CreateComponent } from './create.component';

import { PageService } from './page.service';
import { MessageService } from './message.service';

import { routing } from './app.routing';

import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    ClipboardModule,
    routing
  ],
  declarations: [
    AppComponent,
    CreateComponent
  ],
  providers: [
    PageService,
    MessageService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
