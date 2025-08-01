import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class MusicPlayerComponent implements OnChanges {
  @Input() musicUrl: string | null = null;
  @Input() emotionLabel: string | null = null;
  audio: HTMLAudioElement | null = null;

  ngOnChanges() {
    if (this.musicUrl && this.audio) {
      this.audio.src = this.musicUrl;
      this.audio.load();
    }
  }
}
