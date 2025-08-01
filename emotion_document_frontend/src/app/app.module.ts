import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DocumentUploaderComponent } from './document-uploader/document-uploader.component';
import { DocumentPreviewComponent } from './document-preview/document-preview.component';
import { EmotionDisplayComponent } from './emotion-display/emotion-display.component';
import { MusicPlayerComponent } from './music-player/music-player.component';

@NgModule({
  declarations: [
    AppComponent,
    DocumentUploaderComponent,
    DocumentPreviewComponent,
    EmotionDisplayComponent,
    MusicPlayerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
