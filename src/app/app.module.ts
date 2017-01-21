import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent }  from './app.component';
import { CreateComponent } from './create.component';
import { ListComponent } from './list.component';
import { LoginComponent } from './login.component';
import { ViewComponent } from './view.component';

import { PageService } from './page.service';
import { LocalPageService } from './localpage.service';
import { MessageService } from './message.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

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
    CreateComponent,
    ListComponent,
    LoginComponent,
    ViewComponent
  ],
  providers: [
    PageService,
    LocalPageService,
    MessageService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
