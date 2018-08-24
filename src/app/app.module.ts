import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { CommonModule } from '@angular/common';
import { WindowRef } from './service/WindowRef';
import { localStorageProviders } from '@ngx-pwa/local-storage';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CKEditorModule,
    FormsModule,
    CommonModule,
  ],
  providers: [WindowRef, localStorageProviders({ prefix: 'myapp' })
],
  bootstrap: [AppComponent]
})
export class AppModule { }
