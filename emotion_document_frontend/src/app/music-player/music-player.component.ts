import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.css']
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
