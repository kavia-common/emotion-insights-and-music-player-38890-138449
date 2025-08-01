import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentUploaderComponent } from './document-uploader/document-uploader.component';
import { DocumentPreviewComponent } from './document-preview/document-preview.component';
import { EmotionDisplayComponent } from './emotion-display/emotion-display.component';
import { MusicPlayerComponent } from './music-player/music-player.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    DocumentUploaderComponent,
    DocumentPreviewComponent,
    EmotionDisplayComponent,
    MusicPlayerComponent
  ]
})
export class AppComponent {
  selectedFile: File | null = null;
  topEmotions: { emotion: string, score: number }[] = [];
  musicUrl: string | null = null;
  dominantEmotion: string | null = null;

  onPreviewFile(file: File) {
    this.selectedFile = file;
    this.topEmotions = [];
    this.musicUrl = null;
    this.dominantEmotion = null;
  }

  onUploadComplete(result: any) {
    this.topEmotions = result?.emotions?.slice(0, 3) || [];
    this.musicUrl = result?.music_url ?? null;
    this.dominantEmotion = this.topEmotions?.[0]?.emotion || null;
  }
}
