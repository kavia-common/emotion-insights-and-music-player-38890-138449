import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-emotion-display',
  templateUrl: './emotion-display.component.html',
  styleUrls: ['./emotion-display.component.css']
})
export class EmotionDisplayComponent {
  @Input() emotions: { emotion: string, score: number }[] = [];
}
