import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AngularMaterialModule } from "./angular-material.module";


import { AppComponent } from './app.component';
import { HeaderComponent } from './user-page/header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { UserDetailsComponent } from './user-page/user-details/user-details.component';
import { UserPageComponent } from './user-page/user-page.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideNavComponent,
    UserDetailsComponent,
    UserPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
