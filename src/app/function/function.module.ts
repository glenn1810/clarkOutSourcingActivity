import { NgModule } from "@angular/core";

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import { FunctionComponent } from './function.component';


@NgModule({
  imports: [
    BrowserModule,
    SharedModule
  ],
  declarations: [
    FunctionComponent
  ],
  exports: [
    FunctionComponent
  ]
})

export class FunctionModule { }
